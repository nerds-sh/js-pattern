const matchWith = (value, dict) => (condition, lambda) => {
    if(typeof condition === 'function') {
        dict = {...dict, [condition(value)]: matched => lambda(matched)}
    }
    else if (typeof condition === 'boolean') {
        dict = {...dict, [condition]: matched => lambda(matched)}
    }
    else {
        dict = {...dict, [condition === value]: matched => lambda(matched)}
    }

    return match(value, dict)
}

const isLike = (value, comparison) => Object.keys(comparison)
    .filter(key => value[key])
    .every(key => value[key] === comparison[key])

const like = (value, dict) => (comparison, lambda) => {
    dict = {...dict, [isLike(value, comparison)]: matched => lambda(matched)}

    return match(value, dict)
}

const otherwise = (value, dict) => lambda => dict[true] ? dict[true](value) : lambda(value)

const match = (value, dict={}) => ({
    with: matchWith(value, dict),
    like: like(value, dict),
    otherwise: otherwise(value, dict),
    execute: () => dict[true](value)
})

module.exports = match
