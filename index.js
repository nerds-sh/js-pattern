const matchWith = (value, dict) => (condition, lambda) => {
    if(typeof condition === 'function') {
        dict = {...dict, [condition(value)]: matched => lambda(matched)}
    }
    else if (typeof condition === 'boolean') {
        dict = {...dict, [condition]: matched => lambda(matched)}
    }
    else if (Array.isArray(condition)) {
        dict = {...dict, [condition.some(entry => entry === value)]: matched => lambda(matched)}
    }
    else {
        dict = {...dict, [condition === value || !!condition]: matched => lambda(matched)}
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

const hasField = (value, field) => Object.keys(value)
    .includes(field)

const has = (value, dict) => (field, lambda) => {
    dict = {...dict, [hasField(value, field)]: matched => lambda(matched)}

    return match(value, dict)
}

const otherwise = (value, dict) => lambda => dict[true] ? dict[true](value) : lambda(value)

const match = (value, dict={}) => ({
    with: matchWith(value, dict),
    like: like(value, dict),
    otherwise: otherwise(value, dict),
    has: has(value, dict),
    execute: () => dict[true](value)
})

module.exports = match
