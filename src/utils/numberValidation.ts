export  function validateNumber() {

}

export function prepareNumber(number: string): string {
    let cleaned = number.trim().replace(/\s+/g, "");
   
    if (cleaned.startsWith("+")) {
        cleaned = cleaned.slice(1);
    }

    cleaned = cleaned.replace(/\D/g, "");
    
    return cleaned;
  }
  