
"use server"

import dbConnect from "@/lib/db";
import { Group, GroupMember } from "@/models/Group";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createGroupAction(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any).id) {
        return { error: "Not authenticated" };
    }

    const name = formData.get('name') as string;
    const budget = formData.get('budget') as string;
    const date = formData.get('date') as string;

    if (!name) return { error: "Name is required" };

    try {
        await dbConnect();

        // Create Group
        const newGroup = await Group.create({
            name,
            budget_limit: budget,
            exchange_date: date ? new Date(date) : null,
            admin_user_id: (session.user as any).id,
            status: 'planning'
        });

        // Add Creator to Group
        await GroupMember.create({
            group_id: newGroup._id,
            user_id: (session.user as any).id
        });

        return { success: true, groupId: newGroup._id.toString() };

    } catch (e: any) {
        return { error: e.message };
    }
}

export async function getDashboardGroups() {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any).id) return [];

    const userId = (session.user as any).id;
    await dbConnect();

    // Find memberships
    const memberships = await GroupMember.find({ user_id: userId }).populate('group_id');

    // Extract groups and format
    return memberships.map(m => {
        const g = m.group_id;
        if (!g) return null;
        return {
            id: g._id.toString(),
            name: g.name,
            budget_limit: g.budget_limit,
            exchange_date: g.exchange_date,
            status: g.status,
            admin_user_id: g.admin_user_id.toString()
        };
    }).filter(Boolean);
}

export async function getGroupDetails(id: string) {
    await dbConnect();
    const group = await Group.findById(id);
    if (!group) return null;

    // Get members
    const members = await GroupMember.find({ group_id: id }).populate('user_id', 'full_name');

    return {
        ...group.toObject(),
        id: group._id.toString(),
        admin_user_id: group.admin_user_id.toString(),
        members: members.map(m => ({
            id: m._id.toString(),
            user_id: m.user_id._id.toString(),
            user: {
                full_name: (m.user_id as any).full_name,
            },
            joined_at: m.joined_at
        }))
    };
}

export async function joinGroupAction(groupId: string) {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any).id) {
        return { error: "Not authenticated" };
    }

    const userId = (session.user as any).id;
    await dbConnect();

    // Check availability
    const group = await Group.findById(groupId);
    if (!group) return { error: "Group not found" };
    if (group.status !== 'planning') return { error: "Group is already closed for new members" };

    // Check existing membership
    const existing = await GroupMember.findOne({ group_id: groupId, user_id: userId });
    if (existing) return { error: "Already a member" };

    // Join
    try {
        await GroupMember.create({
            group_id: groupId,
            user_id: userId
        });
        return { success: true };
    } catch (e: any) {
        return { error: e.message };
    }
}
