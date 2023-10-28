
import express from "express";

const router = express.Router();
router.get(
    '/google', (req, res) => {
        res.send({});
    });

router.get(
    '/google/callback',
    (req, res) => {
        res.send({});
    });

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/api/current_user', (req, res) => {
    res.send(req.user);
});
export default router