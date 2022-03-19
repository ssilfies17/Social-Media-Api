const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req,res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .populate('reactions')
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No Thought with that ID' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Something went wrong'})
                    : User.findOneAndUpdate(
                        {username: req.params.username},
                        {$addToSet: {thoughts: req.body}},
                        {runValidators: true, new: true}
                    )
                    .then((thought) =>
                        !thought
                            ? res.status(404).json({ message: 'No user found with that Username'})
                            : res.json({ message: 'User successfully updated!'})
                    )
                    .catch((err) => res.status(500).json(err))
                );
        
        
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No Thought with that ID' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thought with that ID' })
                    : res.json({ message: 'Thought successfully deleted'})
            )
            .catch((err) => res.status(500).json(err));
    },

};