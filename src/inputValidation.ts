import { ObjectId } from "mongodb"

export function toNumber(input: string): number { 
    if (!Number(input.trim())) { 
        throw new Error("Value must be number")
    }
return Number(input.trim())
}

export function parseId(input: string): ObjectId { 
    if (!ObjectId.isValid(input.trim()) ) { 
        throw new Error("Id not valid")
    }
return new ObjectId(input.trim())
}

export function requiredInput(input: string): string { 
    if (input.trim().length === 0) { 
        throw new Error("This field is require")
    }
    return input.trim()
}

export function tagsToArray(str: string): string[] { 
    return str.split(",").map(t => t.trim())
}