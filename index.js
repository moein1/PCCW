/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => {
    return 'hello world';
};

/**
 *  @param {Array} suppliedProperties
 *  @param {Array} inputArray
 *  @returns {Array}
 */
exports.stripPrivateProperties = (suppliedProperties, inputArray) => {
    //Go through all the items in the input array
    inputArray.map(item => {
        //Go through all the supplied property that should be excluded from the result
        suppliedProperties.map(exclude => {
            /*
            find the item that has the supplied property inside
            it and remove the property from the object
            */
            delete item[exclude];
        })
    })
    return inputArray;
};

/**
 *  @param {String} suppliedProperty
 *  @param {Array} inputArray
 *  @returns {Array}
 */
exports.excludeByProperty = (suppliedProperty, inputArray) => {
    // return back a new array that the object with specific property has been
    // filterd
    return inputArray.filter(item => {
        // return if the supplied property is not in the object
        return item[suppliedProperty] == null;
    });
};

/**
 *  @param {Array} inputArray
 *  @returns {Array}
 */
exports.sumDeep = (inputArray) => {
    const result = [];
    //Go through all the object of the array
    inputArray.map(item => {
        //Go through all the properties of the specific object
        for (let key in item) {
            let sum = 0;
            ///Go through all the items of the array
            item[key].map(child => {
                /*
                Sum all the value of the 'val' property
                that belong to the specific property
                */
                sum += child['val'];
            })
            /*
            push a new object to the result that the key is
            the specific key and the value is calculated deep sum
            */
            result.push({[key]: sum});
        }
    })
    return result;
};

/**
 *  @param {Object} colorObject
 *  @param {Array} inputArray
 *  @returns {Array}
 */
exports.applyStatusColor = (colorObject, inputArray) => {
    //Create a new array for storing the result
    const result = [];
    //Go through all the items of the array
    inputArray.map(item => {
        //Go through all the properties of the specific object
        for (let key in item) {
            //Go through all the properties of the input colorObject
            for (let color in colorObject) {
                //Go through all the color codes that belong to the selected color
                colorObject[color].filter(code => {
                    /*
                     Select if the selceted color code is the
                     same as the value of the specific property
                    */
                    if (code === item[key]) 
                        /*
                        push the a new object inside the result
                        array according the item that has been found
                        */
                        result.push({[key]: item[key], color: color})
                })
            }
        }
    })
    return result;
};
/**
 *  @param {string} name
 *  @param {String} greeting
 *  @returns {function}
 */
exports.createGreeting = (name, greeting) => {
    //Create the input greeting function
    const greet = (greeting, name) => (greeting + ' ' + name);
    /*
    use the bind for providing the default value and
    create a fuctory function that we just need to provide
    one argument and the other has been setup by default
    */

    return greet.bind(this, greeting);
};

/**
 *  @param {Object} defaultProperties
 *  @returns {function}
 */
exports.setDefaults = (defaultProperties) => {
    /*
    //return the a new function that can recieve
    the object that should have some default
    properties that has been provided
    */
    return (inputObject) => {
        //Go through all the properties of the default
        for (let defaultKey in defaultProperties) {
            let exist = false;
            //Go through all the property of the input object
            for (let key in inputObject) {
                //Check if we have the default property in the object
                if (key == defaultKey) 
                    exist = true;
                }
            //Add the new default property to the input object if we do not hsve
            if (!exist) 
                inputObject[defaultKey] = defaultProperties[defaultKey];
            }
        return inputObject;
    }
};

/**
 *  @param {Object} user
 *  @returns {Object}
 */
exports.sanitizeUser = (user) => {  
    /*
    first we should check that we hava address property
    Ensure a user has an `fullAddress` property by combining 
    `address.streetNum,address.streetName, address.suburb`
    */     
    if (user.address) {
        if (user.address.num && user.address.street && user.address.suburb) {
            user.fullAddress = 
            `${user.address.num} ${user.address.street}, ${user.address.suburb}`;
        }
    }

    /*
    The given user always returns the `monthJoined` as 0 to 11.
     We need it to be 1 to 12 so add 1.
     first we check for existing and bening a Number
    */
    if (user.monthJoined && !isNaN(user.monthJoined)) 
        user.monthJoined = user.monthJoined + 1;
    
     //Check if we have the user name
    if (user.name) {
        //Create an array of item inside the full name
        const nameArray = user.name.split(' ');
        //Set the First name as the first string inside the full name
        user.firstName = nameArray[0];
    }

return user;
};
