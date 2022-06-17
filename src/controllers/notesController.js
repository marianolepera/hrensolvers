import Note from "../models/notes"

export const createNote = async (req,res)=>{

    const note = new Note(req.body);
    try {

        const noteSaved = await note.save();

        res.status(201).json(noteSaved);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const getNotes = async (req,res,next)=>{
    try {
        
        const notes = await Note.find({});
        console.log(notes)
        res.json(notes);
    } catch (error) {
        console.log(error);
        next();
    }
}

export const getNoteById = async (req,res)=>{
    const note = await Note.findById(req.params.noteId);

    if(!note) {
        res.json({mensaje : 'Esa nota no existe'});
        return next();
    }

    // Mostrar el producto
    res.json(note);
}

export const updateNoteById = async(req,res,next)=>{
    try {
        let newNote = req.body;

        let note = await Note.findOneAndUpdate({_id : req.params.noteId}, newNote, {
            new : true,
        });

        res.json(note);
    } catch (error) {
        console.log(error);
        next();
    }
}

export const deleteNoteById = async(req,res,next)=>{

    try {
        await Note.findByIdAndDelete({ _id : req.params.noteId });
        res.json({mensaje : 'la nota  se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
    
}