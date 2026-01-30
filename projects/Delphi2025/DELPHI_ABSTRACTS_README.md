# Delphi Workshop 2025 - Abstract Pop-ups Implementation

## ✅ What Was Done

I've successfully added abstract pop-up functionality to your Delphi Workshop 2025 site. Here's what was implemented:

### 1. **Abstracts Data File** (`content/abstracts.json`)
- Created a structured JSON file to store all speaker abstracts
- Includes entries for all keynote speakers and invited speakers
- Each entry has: name, title, and abstract fields
- **Currently contains placeholders** - needs actual abstract text

### 2. **Modal Component** (`app/components/AbstractModal.tsx`)
- Beautiful pop-up dialog using Headless UI
- Smooth animations and transitions
- Displays speaker name, talk title, and abstract
- Click outside or press ESC to close
- Fully responsive design

### 3. **Clickable Speaker Text** (`app/components/ClickableSpeakerText.tsx`)
- Intelligent parser that identifies speaker names in the program
- Automatically makes "By [Speaker Name]" clickable in the schedule
- Hover effects show it's interactive
- Maps speaker names to their abstracts

### 4. **Updated Main Page** (`app/page.tsx`)
- Added state management for modal
- Made all speaker cards clickable (both keynotes and invited speakers)
- Added "Click for abstract" hint on speaker cards
- Integrated clickable names throughout the program schedule
- Speaker names in the schedule are now underlined links

## 🎨 Features

### Clickable Areas:
1. **Keynote Speaker Cards** - Click anywhere on the card
2. **Invited Speaker Cards** - Click anywhere on the card  
3. **Program Schedule** - Click on any speaker name in the "By [Name]" text

### Visual Feedback:
- Speaker cards scale up and change border color on hover
- Speaker names in schedule have dotted underline that becomes solid on hover
- Cursor changes to pointer on all clickable elements
- Smooth modal animations

## 📋 Next Steps (REQUIRED)

### 1. Install Dependencies
You need to install `@headlessui/react`. Due to disk space issues, this wasn't installed automatically.

```powershell
cd Z:\CascadeProjects\websites-github
npm install @headlessui/react
```

### 2. Add Actual Abstract Text
Open `content/abstracts.json` and replace the placeholders with actual abstracts from the Word documents in `Z:\Delphi- Abstracts\`.

**Mapping of files to JSON keys:**

| Speaker | JSON Key | Source File |
|---------|----------|-------------|
| Dag Trygve Truslew Haug | `dag-haug` | `Dag Trygve\Diachronic corpora from Greek to Norwegian.docx` |
| George Mikros | `george-mikros` | `Mikros\Abstract.docx` |
| Carola Trips | `carola-trips` | `Carola Trips\talk-workshop-delphi-carola-trips.docx` |
| Alexandros Tantos | `alexandros-tantos` | *(Contact for abstract)* |
| Ioanna Sitaridou | `ioanna-sitaridou` | *(TBA)* |
| Mirjam Fried | `mirjam-fried` | `Fried\ELIDEK abstract.docx` |
| Francesca Dell'Oro | `francesca-delloro` | `Dell Oro\DellOro_VolitionEvidentialityGenre.docx` |
| Daniel Riaño Rufilanchas | `daniel-riano` | `Daniel Riaño Rufilanchas\...Genitive...proposal.odt` |
| Iván Andrés-Alba | `ivan-andres` | `Ivas Andres Alba\Ivan Andres Alba.docx` |
| Stavroula Kefala | `stavroula-kefala` | `Kefala\Abstract.docx` |
| Kiki Nikiforidou | `kiki-nikiforidou` | `Nikiforidou\Nikiforidou_ Talk abstract.docx` |
| Vassiliki Geka | `vassiliki-geka` | `Geka\Tracks to the past...verb think.docx` |
| Anna Piata | `anna-piata` | `Piata\Abstract_Anna Piata_Genres...Workshop.docx` |
| CHS Team | `chs-team` | `CHS\CHS.docx` |
| Lavidas Team | `lavidas-team` | `Lavidas et al 1\Retranslations Across Milennia.docx` |

**Example of how to add abstract text:**

```json
"dag-haug": {
  "name": "Dag Trygve Truslew Haug",
  "title": "Diachronic corpora from Greek to Norwegian: Lessons learned and future plans",
  "abstract": "Paste the actual abstract text here from the Word document. It can be multiple paragraphs.\n\nUse \\n\\n for paragraph breaks."
}
```

### 3. Test the Site
Start the development server:

```powershell
cd Z:\CascadeProjects\websites-github
npm run dev
```

Then open http://localhost:3000 and:
- Click on any speaker card
- Click on speaker names in the program schedule
- Verify abstracts display correctly
- Test on mobile/tablet sizes

### 4. Build and Deploy
Once everything looks good:

```powershell
npm run build
```

## 🐛 Troubleshooting

**Modal doesn't appear:**
- Check browser console for errors
- Verify `@headlessui/react` is installed
- Make sure abstracts.json has valid JSON syntax

**Speaker names not clickable in schedule:**
- Check that the name in the schedule matches exactly with the speakerMap in `ClickableSpeakerText.tsx`
- Speaker names are case-sensitive

**Styling issues:**
- Ensure Tailwind CSS is configured properly
- Check that all required Tailwind classes are available

## 📂 Files Created/Modified

### New Files:
- `content/abstracts.json` - Abstracts data
- `app/components/AbstractModal.tsx` - Modal dialog component
- `app/components/ClickableSpeakerText.tsx` - Parser for clickable names

### Modified Files:
- `app/page.tsx` - Added modal state, clickable functionality
- `package.json` - Added @headlessui/react dependency

## 💡 Tips

- Keep abstracts concise but informative (200-300 words ideal)
- Use proper punctuation and formatting
- Test on different screen sizes
- Consider adding links or references if needed in abstracts

---

**Implementation completed by Cascade AI Assistant**  
**Date:** November 15, 2025
