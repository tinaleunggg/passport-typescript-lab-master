import express from "express";
import passport from 'passport';
import { ensureAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  if ( req?.user?.role === "admin" ) {
    const result = req.sessionStore.all((err, result) => {
      console.log(result)
      res.render("admin", {
      allSessions: "blanl"
    });
    })

  
  } else {
    res.redirect("/dashboard")
  }
});

export default router;