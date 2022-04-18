// transforme array of array in array of object
const queryArray = Object.entries(query).map((e) => ({ [e[0]]: e[1] }));

//Pour la route /:idOrSlug, mon paramètre peut ne pas être de type Object
// nécessaire pour le fiel _id de Mongoose. Ce qui crée une erreur
// Je récupère les clefs de l'objet erreur pour gerer ça après.
// e.kind === 'ObjectId'
try {
} catch (e) {
  console.log(Object.keys(e), "erreur catch");
}
[
  "messageFormat",
  "stringValue",
  "kind",
  "value",
  "path",
  "reason",
  "valueType",
];
