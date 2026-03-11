import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const db = await getDatabase();
    const todos = await db.collection('todos').find({}).toArray();
    
    // Convert MongoDB _id to string id
    const formattedTodos = todos.map(todo => ({
      id: todo._id.toString(),
      text: todo.text,
      isCompleted: todo.isCompleted
    }));
    
    return NextResponse.json(formattedTodos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;
    
    if (!text || text.trim() === '') {
      return NextResponse.json({ error: 'Todo text is required' }, { status: 400 });
    }
    
    const db = await getDatabase();
    const newTodo = {
      text: text.trim(),
      isCompleted: false,
      createdAt: new Date()
    };
    
    const result = await db.collection('todos').insertOne(newTodo);
    
    return NextResponse.json({
      id: result.insertedId.toString(),
      text: newTodo.text,
      isCompleted: newTodo.isCompleted
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, text, isCompleted } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Todo ID is required' }, { status: 400 });
    }
    
    const db = await getDatabase();
    const updateData: { text?: string; isCompleted?: boolean } = {};
    
    if (text !== undefined) updateData.text = text;
    if (isCompleted !== undefined) updateData.isCompleted = isCompleted;
    
    const result = await db.collection('todos').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      id: result._id.toString(),
      text: result.text,
      isCompleted: result.isCompleted
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Todo ID is required' }, { status: 400 });
    }
    
    const db = await getDatabase();
    const result = await db.collection('todos').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}

