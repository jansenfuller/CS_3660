$(function () {
  $("#fetchQuotesBtn").click(function () {
    // Get selected topic and count from drop-down lists
    const selectedTopic = $("#topicSelection option:selected").val();
    const selectedCount = $("#countSelection option:selected").val();
    fetchQuotes(selectedTopic, selectedCount);
  });
});

function fetchQuotes(topic, count) {
  if (topic === "Choose one") {
    $("#quotes").html("<p>Please select a topic</p>");
    return;
  }

  let html = "<ol>";
  let quotes = [];

  $.get({
    url: `https://wp.zybooks.com/quotes.php?topic=${topic}&count=${count}`,
    dataType: "json",
    success: function (data) {
      if (data.error) {
        $("#quotes").html(data.error);
      } else {
        quotes = data;
        for (let c = 0; c < count; c++) {
          html += `<li>Quote: ${data[c].quote} - ${data[c].source}</li>`;
        }
        html += "</ol>";
        $("#quotes").html(html);
      }
    },
  });

  return quotes.length;
}
