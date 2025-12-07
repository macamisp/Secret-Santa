
import mongoose, { Schema, Model, models } from 'mongoose';

const GroupSchema = new Schema({
    name: { type: String, required: true },
    budget_limit: { type: String, default: null },
    exchange_date: { type: Date, default: null },
    admin_user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['planning', 'drawn', 'completed'], default: 'planning' }
}, { timestamps: true });

const GroupMemberSchema = new Schema({
    group_id: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    wishlist: { type: String, default: null },
    joined_at: { type: Date, default: Date.now }
}, { timestamps: true });

const MatchSchema = new Schema({
    group_id: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    santa_user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipient_user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    is_revealed: { type: Boolean, default: false }
}, { timestamps: true });

export const Group = (models.Group as Model<any>) || mongoose.model('Group', GroupSchema);
export const GroupMember = (models.GroupMember as Model<any>) || mongoose.model('GroupMember', GroupMemberSchema);
export const Match = (models.Match as Model<any>) || mongoose.model('Match', MatchSchema);
