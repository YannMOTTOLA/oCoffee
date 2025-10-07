const aboutController = {
  about(req, res) {
    res.locals.style = 'about';
    res.render('about');
  },
};

export default aboutController;