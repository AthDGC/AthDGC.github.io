'use client';
import React from 'react';

interface ClickableSpeakerTextProps {
    text: string;
    onSpeakerClick: (abstractKey: string) => void;
}

// Map of speaker names to their abstract keys
const speakerMap: { [key: string]: string } = {
    'Dag Trygve Truslew Haug': 'dag-haug',
    'George Mikros': 'george-mikros',
    'Carola Trips': 'carola-trips',
    'Alexandros Tantos': 'alexandros-tantos',
    'Ioanna Sitaridou': 'ioanna-sitaridou',
    'Mirjam Fried': 'mirjam-fried',
    'Francesca Dell\'Oro': 'francesca-delloro',
    'Daniel Riaño Rufilanchas': 'daniel-riano',
    'Iván Andrés-Alba': 'ivan-andres',
    'Stavroula Kefala': 'stavroula-kefala',
    'Claudio Iacobini': 'claudio-iacobini',
    'Kiki Nikiforidou': 'kiki-nikiforidou',
    'Vassiliki Geka': 'vassiliki-geka',
    'Anna Piata': 'anna-piata',
    'Nikolaos Lavidas': 'lavidas-team',
    'Esteban Belmehdi': 'chs-team',
    'Ioanna Papadopoulou': 'chs-team',
    'Julien Razanajao': 'chs-team',
    'Mark Schiefsky': 'chs-team'
};

export default function ClickableSpeakerText({ text, onSpeakerClick }: ClickableSpeakerTextProps) {
    // Parse the text and make titles clickable, not names
    const renderText = () => {
        // Check for "By [Speaker Name]" pattern
        const byPattern = /^(.+?)\s+By\s+([^(]+?)(\s+\(.*)?$/;
        const match = text.match(byPattern);

        if (!match) {
            // No "By" pattern found, return plain text
            return <span>{text}</span>;
        }

        const title = match[1].trim();
        const speakerName = match[2].trim();
        const remainingText = match[3] || '';

        // Find the abstract key for this speaker
        let abstractKey: string | null = null;
        for (const [key, value] of Object.entries(speakerMap)) {
            if (speakerName.includes(key) || key.includes(speakerName)) {
                abstractKey = value;
                break;
            }
        }

        if (!abstractKey) {
            // No matching speaker found, return plain text
            return <span>{text}</span>;
        }

        return (
            <>
                {/* Clickable title (already includes period) */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onSpeakerClick(abstractKey!);
                    }}
                    className="text-gray-700 hover:text-primary-600 transition-colors underline decoration-dotted hover:decoration-solid text-left"
                >
                    {title}
                </button>
                {' '}
                <span>By </span>
                {/* Non-clickable speaker name in bold */}
                <span className="font-semibold">{speakerName}</span>
                {remainingText}
            </>
        );
    };

    return <span className="text-sm text-gray-700">{renderText()}</span>;
}
