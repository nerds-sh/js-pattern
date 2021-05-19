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

const otherwise = (value, dict) => lambda => dict[true] ? dict[true](value) : lambda(value)

const match = (value, dict={}) => ({
    with: matchWith(value, dict),
    otherwise: otherwise(value, dict),
    execute: () => dict[true](value)
})

module.exports = match
