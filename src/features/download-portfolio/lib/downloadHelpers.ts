export const downloadHelpers = async (fileUrl: string, outputName: string) => {
  try {
    const response = await fetch(fileUrl);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = outputName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("다운로드 실패:", error);
  }
};
