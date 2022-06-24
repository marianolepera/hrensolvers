import Note from "../models/notes"
import User from "../models/users"

export const createNote = async (req,res,next)=>{

    const user = await User.findById(req.params.userId);

    const newNote = new Note({
        title: req.body.title,
        content: req.body.content,
        category:req.body.category,
        user:user._id
    })

    try {

        const noteSaved = await newNote.save();

        // user.notes.push(noteSaved)
        // await user.save()

        res.status(201).json(noteSaved);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const getNotes = async (req,res,next)=>{
    try {
        
        const notes = await Note.find({}).populate("user");
        console.log(notes)
        res.json(notes);
    } catch (error) {
        console.log(error);
        next();
    }
}

export const getNoteById = async (req,res,next)=>{
    const note = await Note.findById(req.params.noteId);

    if(!note) {
        res.json({mensaje : 'Esa nota no existe'});
        return next();
    }
    res.json(note);
}

export const getNotesByUserId = async (req,res,next)=>{
    const note = await Note.find({user:req.params.userId}).populate("user")

    if(!note) {
        res.json({mensaje : 'Esa nota no existe con el usuario'});
        return next();
    }
    res.json(note);
}

export const updateArchiveToTrueOrFalse = async(req,res,next)=>{
    try {
        let note= await Note.findOneAndUpdate(
            { _id: req.params.noteId },
            [
              { $set: { archive: { $not: "$archive" } } }
            ]
          );
        res.json({note:note});
    } catch (error) {
        console.log(error);
        next();
    }
}

export const updateNoteById = async(req,res,next)=>{
    try {
        let note = await Note.findOneAndUpdate({_id : req.params.noteId}, req.body, {
            new: true
        } )
        .populate('user')

        // let user = await User.findOneAndUpdate({_id : req.params.userId}, req.body, {
        //     new: true
        // } )
        // .populate('notes')

        res.json({note:note});
    } catch (error) {
        console.log(error);
        next();
    }
}

export const deleteNoteById = async(req,res,next)=>{

    try {
        const note_Id = req.params.noteId;
        const foundNote = await Note.findById(note_Id);
        // const foundUser = await User.findById({ _id : req.params.userId });
        if (!foundNote) {
            const err = new Error(
                'Could not find note.',
        );
            err.statusCode = 404;
            throw err;
        }
        await Note.findByIdAndRemove(note_Id);
        //foundUser.notes.pull({ _id: note_Id });
        //await foundUser.save();
        res.status(200).json({ message: 'Nota eliminada'});
    } catch (error) {
        console.log(error);
        next();
    }
    
}