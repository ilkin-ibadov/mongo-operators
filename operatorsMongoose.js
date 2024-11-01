const User = mongoose.model('User', new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    status: { type: String, enum: ["active", "pending", "inactive"], required: true },
    tags: { type: [String], required: true },
    comments: [{
        author: { type: String, required: true },
        content: { type: String, required: true },
        likes: { type: Number, default: 0 }
    }],
    description: { type: String, required: true },
    joinedDate: { type: Date, default: Date.now } // Added joinedDate field
}));


// Logical Operators: $and, $or, $not, $nor
async function getLogicalResults() {
    const results = await Model.find()
        .and([
            { age: { $gte: 18 } },
            { $or: [{ status: "active" }, { status: "pending" }] },
            { $not: { status: { $eq: "inactive" } } },
            { $nor: [{ tags: "deprecated" }, { age: { $gt: 60 } }] },
        ]);
    return results;
}

// Element Operators: $exists, $type
async function getElementResults() {
    const results = await Model.find({
        age: { $exists: true }, // documents with the age field
        tags: { $type: "array" }, // tags field must be of type array
    });
    return results;
}

// Array Operators: $all, $elemMatch, $size
async function getArrayResults() {
    const results = await Model.find({
        tags: { $all: ["tech", "news"] }, // array must contain both "tech" and "news"
        tags: { $size: 2 }, // tags array must contain exactly 2 elements
        comments: {
            $elemMatch: { author: "John", likes: { $gt: 10 } },
        }, // element in comments array must match these conditions
    });
    return results;
}

// Evaluation Operator: $text
async function getTextResults() {
    const results = await Model.find({
        $text: { $search: "technology" }, // text search for documents with "technology" in description
    });
    return results;
}


/*
Query Operators

Query operators are used to specify conditions for retrieving documents from a collection.
They allow you to filter and sort documents based on certain criteria.

=> Comparison Operators: These operators compare a field's value against a specified value.

$eq: Matches values that are equal to a specified value.
$ne: Matches values that are not equal to a specified value.
$gt: Matches values that are greater than a specified value.
$gte: Matches values that are greater than or equal to a specified value.
$lt: Matches values that are less than a specified value.
$lte: Matches values that are less than or equal to a specified value.


=> Logical Operators: These operators allow you to combine multiple conditions.

$and: Joins query clauses with a logical AND.
$or: Joins query clauses with a logical OR.
$not: Inverts the effect of a query expression.
$nor: Joins query clauses with a logical NOR.


=> Element Operators: These operators are used to check for the existence of fields or their types.

$exists: Matches documents that contain a specified field.
$type: Matches documents with a specified data type.


=> Array Operators: These operators are used to query arrays.

$all: Matches arrays that contain all specified elements.
$elemMatch: Matches documents that contain an array field with at least one element that matches all specified criteria.
$size: Matches documents with an array field of a specified size.


=> Evaluation Operators: These operators are used for text search and pattern matching.

$text: Performs text search on a string.
$regex: Matches strings using regular expressions.
*/