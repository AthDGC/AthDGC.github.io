# Abstracts Update Summary

## Changes Completed

### 1. ✅ Added Abstracts as Pop-up Texts

All abstracts from `Z:\Delphi- Abstracts` have been successfully extracted and added to the website. The abstracts now appear as pop-up modals when users click on:
- Speaker names in the program/schedule
- Speaker cards in the Speakers section

**Abstracts Updated:**
- ✓ Dag Trygve Truslew Haug
- ✓ George Mikros
- ✓ Carola Trips
- ✓ Mirjam Fried
- ✓ Francesca Dell'Oro
- ✓ Daniel Riaño Rufilanchas (from ODT file)
- ✓ Iván Andrés-Alba
- ✓ Stavroula Kefala
- ✓ Kiki Nikiforidou
- ✓ Vassiliki Geka
- ✓ Anna Piata
- ✓ CHS Harvard Team (Esteban Belmehdi, Ioanna Papadopoulou, Julien Razanajao)
- ✓ Lavidas Team (Nikolaos Lavidas et al.)

**Note:** Abstracts for Alexandros Tantos and Ioanna Sitaridou are marked as pending (to be provided).

### 2. ✅ Changed "lexicons" to "lexica"

Updated the About section in `app/page.tsx` (line 248):
- **Before:** "We are developing corpus-based valency **lexicons** for ancient..."
- **After:** "We are developing corpus-based valency **lexica** for ancient..."

## Files Modified

1. **content/abstracts.json** - Updated with all abstracts from Word/ODT documents
2. **app/page.tsx** - Changed "lexicons" to "lexica"

## How It Works

The website already had the infrastructure in place:
- **SimpleModal component** displays abstracts in a pop-up dialog
- **ClickableSpeakerText component** makes speaker names clickable in the program schedule
- **Speaker cards** in the Speakers section are already clickable

Users can now:
1. Click on any speaker name in the program schedule to view their abstract
2. Click on any speaker card in the Speakers section to view their abstract
3. Close the modal by clicking the X button or the Close button

## Technical Details

- Abstracts were extracted from Word documents (.docx) using the `python-docx` library
- The ODT file was handled using the `odfpy` library
- All abstracts are stored in JSON format with proper escaping
- The modal system uses Headless UI components for accessibility
