const path="http://localhost:8080/api/v1/file/image";
export default function fetchFileFromUrl(prefix,url) {
  return fetch(`${path}/${prefix}/${url}`)
    .then(response => response.blob())
    .then(blob => new File([blob], `${url}`, { type: blob.type }));
}