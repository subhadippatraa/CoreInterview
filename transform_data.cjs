const fs = require('fs');
const path = require('path');

const topicsDir = path.join(__dirname, 'src', 'data', 'topics');

function processString(str) {
    if (!str) return { pitch: '', explanation: '', example: '' };
    
    // Clean markdown bolding for the pitch
    const cleanStr = str.replace(/\*\*/g, '');
    const sentences = cleanStr.match(/[^.!?]+[.!?]+/g) || [cleanStr];
    let pitch = sentences[0] || cleanStr;
    if (pitch.length < 30 && sentences.length > 1) {
        pitch += ' ' + sentences[1];
    }
    pitch = pitch.trim();
    
    // For explanation, use original bolding but try to strip the pitch part approximately.
    // simpler: just dump the whole original string if it's too hard to subtract out the markdown gracefully
    let explanation = str; 
    
    let example = '';
    const codeBlockRegex = /```[\s\S]*?```/g;
    const blocks = str.match(codeBlockRegex);
    if (blocks && blocks.length > 0) {
        example = blocks.join('\n\n');
        blocks.forEach(b => {
            explanation = explanation.replace(b, '').trim();
        });
    }
    return { pitch, explanation, example };
}

function processFiles() {
    const files = fs.readdirSync(topicsDir);
    for (const file of files) {
        if (!file.endsWith('.json') || file.includes('_followups')) continue;
        const filePath = path.join(topicsDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const newData = data.map(q => {
            if (q.answer && !q.interviewPitch) {
                const res = processString(q.answer);
                return {
                    ...q,
                    interviewPitch: res.pitch,
                    explanation: res.explanation,
                    example: res.example
                };
            }
            return q;
        });
        fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
    }
}

function processFollowups() {
    const files = fs.readdirSync(topicsDir);
    for (const file of files) {
        if (!file.endsWith('_followups.json')) continue;
        const filePath = path.join(topicsDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const newData = data.map(item => {
            if (item.followUps && Array.isArray(item.followUps)) {
                return {
                    ...item,
                    followUps: item.followUps.map(fu => {
                        if (typeof fu === 'string') {
                            return { question: fu, answer: "Discuss core concepts and trade-offs directly related to this follow-up." };
                        }
                        return fu;
                    })
                };
            }
            return item;
        });
        fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
    }
}

processFiles();
processFollowups();
console.log('Data transformed');
