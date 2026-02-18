# 🏆 Vouch Bot - Pure (Components v2)

Ein leistungsstarker Discord Vouch Bot, der das modernste **Discord Components v2** System nutzt, um eine premium Benutzeroberfläche zu bieten.

## ✨ Features

- **Vouch System**: Benutzer können Feedbacks mit einer Sternebewertung (1-5 ⭐) und einem Kommentar hinterlassen.
- **Detaillierte Statistiken**: `/vouches` zeigt die Gesamtzahl der Feedbacks, die Durchschnittsbewertung und die neuesten Einträge.
- **Modernes UI (Components v2)**: Nutzt exklusive Discord Features wie:
  - `ContainerBuilder` für strukturierte Layouts.
  - `MediaGalleryBuilder` für die Anzeige von GIFs/Bildern.
  - `TextDisplayBuilder` & `SeparatorBuilder` für saubere Typografie.
- **Datenspeicherung**: Alle Vouches werden sicher in einer lokalen `vouches.json` Datei gespeichert.
- **Automatische Logs**: Neue Vouches werden automatisch in einem konfigurierten Channel gepostet.

## 🛠️ Setup Guide

### 1. Voraussetzungen

- [Node.js](https://nodejs.org/) (Version 16.11.0 oder höher empfohlen)
- Ein registrierter Discord Bot im [Discord Developer Portal](https://discord.com/developers/applications)

### 2. Installation

Klone das Repository oder lade die Dateien herunter und installiere die benötigten Abhängigkeiten:

```bash
npm install
```

### 3. Konfiguration

Öffne die `config.json` und fülle die entsprechenden Felder aus:

```json
{
  "token": "DEIN_BOT_TOKEN",
  "clientid": "DEINE_APPLICATION_ID",
  "guildid": "DEINE_SERVER_ID",
  "statusText1": "hopeleaks",
  "statusText2": "discord.gg/getpure",
  "vouchChannelId": "CHANNEL_ID_FÜR_LOGS"
}
```

### 4. Starten

Starte den Bot mit dem folgenden Befehl:

```bash
node index.js
```

## 📜 Befehle

- `/vouch [stars] [comment]`: Erstellt einen neuen Vouch.
- `/vouches`: Zeigt die allgemeinen Statistiken und die letzten 5 Feedbacks.
- `/vouches-restore`: Ermöglicht das Wiederherstellen oder Importieren von Vouches.

## 💎 Components v2 Hinweis

Dieses Projekt wurde speziell für **Components v2** entwickelt. Es nutzt die neuesten Discord UI-Flags (`IsComponentsV2`), um Nachrichten ohne die klassische Embed-Struktur in einem modernen, integrierten Design anzuzeigen.

---

_Entwickelt für PURE / HOPELEAKS_
