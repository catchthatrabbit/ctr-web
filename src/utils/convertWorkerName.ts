export const convertWorkerName = (str:string ):{href:string, caption:string} => {

    if(str === null)
        return {} as {href:string, caption:string};

    let regex = /^_([a-z0-9]+)-(\d{1,5})([A-Z][^\s]*)([A-Z][^\s]*)$/;

    let hrefReplacement = "@$1";

    let captionReplacement = "@$1@$3.$4 $2";

    let hrefFormatted = str.replace(regex, hrefReplacement);

    let captionFormatted = str.replace(regex, captionReplacement)
    
    return {
        href:hrefFormatted,
        caption:captionFormatted
    };
}