const deepCopy=(obj)=>{

    // 如果不是对象就直接拷贝
    if(typeof obj!=="object" || typeof obj==="null"){
        return obj;
    }

    // 初始化拷贝对象
    let result=Array.isArray(obj)?[]:{};
    Object.setPrototypeOf(result,Object.getPrototypeOf(obj));

    // 递归复制原对象的属性至拷贝对象
    let propNames=Object.getOwnPropertyNames(obj);
    for(let propName of propNames){
        result[propName]=deepCopy(obj[propName]);
    }
    return result;
}

const curry = (func, ...innerArgs) => (...outerArgs) => {
    let fullArgs = innerArgs.concat(outerArgs);
    return func.apply(null,fullArgs);
};


exports.deepCopy=deepCopy;
exports.curry=curry;