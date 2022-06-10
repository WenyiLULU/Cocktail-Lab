// :point_down::point_down::point_down:
// checks if the user logged in
const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect('/auth/login');
    }
    next();
  };
  
// checks if the user logged out
  const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
      return res.redirect(`/user/details-private/${req.params.id}`);
    }
    next();
  };
  const goToProfil = (req, res, next) => {
    if (req.session.currentUser) {
      return res.redirect(`/user/profile`);
    }
    next();
  };
  module.exports = {
    isLoggedIn,
    isLoggedOut,
    goToProfil
  };