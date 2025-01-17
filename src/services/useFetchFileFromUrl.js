const path="http://localhost:8080/api/v1/file/image";
export default function fetchFileFromUrl(prefix,url) {
  console.log(url)
  return fetch(`${path}/${prefix}/${url}`)
    .then(response => response.blob())
    .then(blob => new File([blob], `${url}`, { type: blob.type }))
    .catch(error => {throw new Error('Could not found image')});
}