function addCommas(num) {
    //turn the num into a string
    const numString = num.toString();

    //split the string into individual characters in an array
    let numArray = numString.split('');

    //create a tail by finding an idx of '.' if no idx exsists tail will be empty ''
    const tailIdx = numArray.indexOf('.');

    //if we have a tail, manage that
    if(tailIdx !== -1) {
        const tail = numArray.slice(tailIdx);
        const remaining = numArray.slice(0, tailIdx);
        const result = commaHelper(remaining) + tail.join('');
        return result;
    }

    //else add our commas
    return commaHelper(numArray);
}

const commaHelper = (remaining) => {
    let finalArr = [];
    while (remaining.length > 3) {
        for (let i = 0; i < 3; i++) {
            const val = remaining.pop();
            finalArr.unshift(val);
        }
        finalArr.unshift(',')
    }
    finalArr = [...remaining, ...finalArr];
    return finalArr.join('');
}

export default addCommas;