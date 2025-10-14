import express from "express";
import passport from 'passport';
import { ensureIsAdmin } from "../middleware/checkAuth";
import session from "express-session";

const router = express.Router();

router.get("/", ensureIsAdmin, (req, res) => {
    const store = req.sessionStore;

    store.all((err, sessions) => {
        if (err) {
            console.error('Error fetching sessions:', err);
            res.render('admin', { sessions: "Session data not available" });
        } else {
            const sessionData = Object.entries(sessions || {}).map(([sessionId, session]: [string, any]) => ({
                sessionId: sessionId,
                userId: session.passport?.user
            }))
            res.render('admin', { sessionData: sessionData });
        }
    });
});

router.get("/revoke/:sessionId", ensureIsAdmin, (req, res)=> {
    const sessionId = req.params.sessionId;
    console.log(sessionId)
    const store = req.sessionStore;
    store.destroy(sessionId, (err) => { console.log(err)});
    res.redirect("/admin")
})

export default router;