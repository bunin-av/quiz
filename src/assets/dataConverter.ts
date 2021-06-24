export const convertData = (data: string) => {
    return data.replace(/&amp;/g, "&")
      .replace(/&quot;/g, "'")
      .replace(/&#039;/g, "'")
      .replace(/&ldquo;/g, "'")
      .replace(/&rdquo;/g, "'")
}