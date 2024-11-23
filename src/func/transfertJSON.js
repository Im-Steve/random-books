export function downloadJSON(data, filename) {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function uploadJSON(event, setFunction) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    try {
      const jsonObject = JSON.parse(content);
      setFunction(jsonObject);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  reader.readAsText(file);
}
