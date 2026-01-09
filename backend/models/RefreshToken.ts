import mongoose, { Document, Schema } from 'mongoose';

export interface IRefreshToken extends Document {
  tokenHash: string;
  user: mongoose.Types.ObjectId;
  revoked: boolean;
  replacedByToken?: string;
  createdAt: Date;
  expiresAt: Date;
  revokedAt?: Date;
}

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    tokenHash: { type: String, required: true, index: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    revoked: { type: Boolean, default: false },
    replacedByToken: { type: String, default: null },
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', refreshTokenSchema);

export default RefreshToken;
