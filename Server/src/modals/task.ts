import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user';  

interface ITask extends Document {
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: Date;
  userId: mongoose.Schema.Types.ObjectId | IUser;
}

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: String },
  deadline: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
export { ITask };
