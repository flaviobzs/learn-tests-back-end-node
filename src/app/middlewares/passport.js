// import passport from 'passport';
// import { Strategy, ExtractJwt } from 'passport-jwt';
// import User from '../models/User';

// export default async (req, res, next) => {
//   const params = {
//     secrectOrKey: process.env.APP_SECRET,
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   };

//   const strategy = new Strategy(params, async (payload, done) => {
//     const user = await User.findByPk(payload.id);

//     if (user) {
//       done(null, { ...payload });
//     } else {
//       done(null, false);
//     }
//   });

//   passport.use(strategy);

//   return {
//     authenticate: () => passport.authenticate('jwt', { session: false }),
//   };
// };
