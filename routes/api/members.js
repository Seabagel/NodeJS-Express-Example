const express = require("express");
const uuid = require("uuid");

const router = express.Router();

const { members } = require("../../json/Members");

// Get All members
router.get("/", (req, res) => res.json(members));

// GET member
router.get("/:id", (req, res) => {
    const found = members.some((member) => member.id == req.params.id);
    // Response
    !found
        ? res.sendStatus(400)
        : res.json(members.filter((member) => member.id == req.params.id));
});

// POST member (create)
router.post("/", (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active",
    };
    if (!newMember.name || !newMember.email) return res.sendStatus(400);

    members.push(newMember);
    res.json(members);
});

module.exports = router;
