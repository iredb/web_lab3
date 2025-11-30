import { toString } from "./toString";

export const shareTask = (task, action) => {
  const text = toString(task);

  if (action === "copy") {
    navigator.clipboard.writeText(text);
    alert("Скопировано!");
  }

  if (action === "tg") {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(text)}`,
      "_blank"
    );
  }

  if (action === "vk") {
    window.open(
      `https://vk.com/share.php?comment=${encodeURIComponent(text)}`,
      "_blank"
    );
  }

  if (action === "whatsapp") {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }

  if (action === "ban") {
    alert("🚫 BAN — forbidden zone.");
  }
};
