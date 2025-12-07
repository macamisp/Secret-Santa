
"use server"

import dbConnect from "@/lib/db";
import { Group, GroupMember, Match } from "@/models/Group";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getAdminGroupData(groupId: string) {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any).id) {
        return { error: "Not authenticated" };
    }

    const userId = (session.user as any).id;
    await dbConnect();

    const group = await Group.findById(groupId);
    if (!group) {
        return { error: "Group not found" };
    }

    if (group.admin_user_id.toString() !== userId) {
        return { error: "Access denied. You are not the admin." };
    }

    // Fetch members with user info
    const members = await GroupMember.find({ group_id: groupId })
        .populate('user_id', 'full_name avatar_url');

    const formattedMembers = members.map(m => ({
        id: m._id.toString(),
        user_id: m.user_id._id.toString(),
        profiles: {
            full_name: m.user_id.full_name,
            avatar_url: m.user_id.avatar_url
        }
    }));

    // Fetch matches if status is drawn
    let formattedMatches: any[] = [];
    if (group.status === 'drawn') {
        const matches = await Match.find({ group_id: groupId })
            .populate('santa_user_id', 'full_name')
            .populate('recipient_user_id', 'full_name');

        formattedMatches = matches.map(m => ({
            id: m._id.toString(),
            is_revealed: m.is_revealed,
            santa: { full_name: m.santa_user_id.full_name },
            recipient: { full_name: m.recipient_user_id.full_name }
        }));
    }

    return {
        success: true,
        group: {
            id: group._id.toString(),
            name: group.name,
            status: group.status,
            admin_user_id: group.admin_user_id.toString(),
            group_members: formattedMembers
        },
        matches: formattedMatches
    };
}

export async function drawNamesAction(groupId: string) {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any).id) {
        return { error: "Not authenticated" };
    }
    const userId = (session.user as any).id;

    await dbConnect();
    const group = await Group.findById(groupId);
    if (!group) return { error: "Group not found" };
    if (group.admin_user_id.toString() !== userId) return { error: "Not authorized" };

    const members = await GroupMember.find({ group_id: groupId });
    if (members.length < 2) return { error: "Need at least 2 members to draw!" };

    // Standard shuffle & circular assignment
    const shuffled = [...members];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const newMatches = shuffled.map((member, index) => {
        const recipient = (index === shuffled.length - 1) ? shuffled[0] : shuffled[index + 1];
        return {
            group_id: groupId,
            santa_user_id: member.user_id,
            recipient_user_id: recipient.user_id,
            is_revealed: false
        };
    });

    // Transaction? Mongoose doesn't support transactions without replica set easily in dev, 
    // so we'll do sequential operations.
    try {
        await Match.deleteMany({ group_id: groupId });
        await Match.insertMany(newMatches);
        group.status = 'drawn';
        await group.save();
        return { success: true };
    } catch (e: any) {
        return { error: e.message };
    }
}
