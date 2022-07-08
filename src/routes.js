import { Router } from "express";
import User from "./models/User.js";
import Alternative from "./models/Alternative.js";
import Question from "./models/Question.js";

const router = Router();

router.get('/', (req, res) => res.redirect('/index.html'));

router.post('/signupuser', async (req, res) => {
    const user = req.body;
    res.json(await User.signup(user));
});

router.get('/tokenverify', async (req, res) => {
    await User.statusAccess(req,res);
});

router.get('/logout', async (req, res) => {
    await User.exitAccess(req,res);
});

router.get('/questions', async (req, res) => {
    const questions = await Question.readAll();

    for (const question of questions) {
        const alternatives = await Alternative.readByQuestion(question.id);
        
        question.alternatives = alternatives;
    }

    res.json(questions);
});

router.post('/questions', async (req, res) => {
    const question = req.body;

    const newQuestion = await Question.create(question);

    res.json(newQuestion);
});

router.get('/alternatives', async (req, res) => {
    const alternatives = await Alternative.readAll();

    res.json(alternatives);
});

export default router;