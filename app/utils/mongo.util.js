// db.user_profiles.aggregate([{$match: {_id:"vibhav@gmail.com"}},
// {
//         $lookup:
//         {
//             from: "events",
//             localField: "_id",
//             foreignField: "user_id",
//             as: "address"
//         }
//     }
// ]).pretty();

// db.collection.aggrigate([{$match:{_id:"id"}},{
//     $lookup:{
//         from:"events",
//         localField:"_id",
//         foreignField:"user_id",
//         as :"attributes"
//     }
// }])


// pipeline: [
//     { $match: {
//         $expr: { $and: [
//             { $in: [ 8, "$all_category_id" ] },
//             { $eq: [ "$article_id", "$$article_id" ] }
//         ] }
//     } }
//   ],
//   as: "article_category"
// } },
// { $match: {
//   $expr: { $gt: [
//     { $size: "$article_category"},
//     0
//   ] }
