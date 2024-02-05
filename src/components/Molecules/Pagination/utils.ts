export const generatePageNumber = (totalPage:number, limit:number, pageShowNumber:number, currentPage:number):Array<string> => {
    
    if(limit === 0 || currentPage === 0 || totalPage === 0)
        return ['1'];

    let pageCount = Math.round(totalPage / limit);

    const pageMod = totalPage % limit;

    if(pageMod > 0)
        pageCount += 1;
    
    const halfOfpageShowNumber = Math.round(pageShowNumber / 2);

    const numList = [...Array(pageCount).keys()].map(num => num + 1);

    let resultList:Array<string> = Array<string>();

    const minRange = currentPage - halfOfpageShowNumber;
    const maxRange = currentPage + halfOfpageShowNumber;


    if(minRange - 1 <= 0)
    {
        if(minRange - 1 < 0)
            resultList = numList.slice(0, 1 + halfOfpageShowNumber).map(String);
        else
            resultList = numList.slice(0, maxRange - 1).map(String);
        resultList.push("...");
        resultList.push(pageCount.toString());
    }
    else if(pageCount - maxRange <= 0 )
    {
        if(pageCount - maxRange < 0)
            resultList = numList.slice(pageCount - halfOfpageShowNumber -1, pageCount).map(String);
        else
            resultList = numList.slice(minRange, pageCount).map(String);
        resultList.push("...");
        resultList.unshift(resultList.pop());
        resultList.push("1");
        resultList.unshift(resultList.pop());
    }
    else
    {
        resultList = numList.slice(minRange, maxRange - 1).map(String);
        resultList.push("...");
        resultList.push(pageCount.toString());
        resultList.push("...");
        resultList.unshift(resultList.pop());
        resultList.push("1");
        resultList.unshift(resultList.pop());
    }

    console.log('resultList', resultList);
    
    return resultList;

}