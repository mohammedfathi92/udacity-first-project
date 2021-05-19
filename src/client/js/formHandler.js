const post = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

export const handleSubmit = async () => {
    const url = document.getElementById('article-url').value
    if (isValidURL(url)) {
        document.getElementById("please-wait").style.display = "block";
        post('http://localhost:8081/fetch', { url }).then((data) => {
            showData(data)
        })
    } else {
        alert('Please check add Valid URL!')
    }
}
function showData(data) {
    document.getElementById("please-wait").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById('agreement').innerHTML = data.agreement
    document.getElementById('subjectivity').innerHTML = data.subjectivity
    document.getElementById('confidence').innerHTML = data.confidence
    document.getElementById('score-tag').innerHTML = data.score_tag
    document.getElementById('irony').innerHTML = data.irony
    document.getElementById('text').innerHTML = data.sentence_list[0].text
}


function isValidURL(url) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i'); 
  return !!pattern.test(url);
}