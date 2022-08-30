export interface EmojiSelect {
    _data:       Data;
    _skins:      null;
    _sanitized:  Sanitized;
    id:          string;
    name:        string;
    colons:      string;
    emoticons:   string[];
    unified:     string;
    skin:        null;
    native:      string;
    short_names: string[];
    short_name:  string;
}

export interface Data {
    subcategory: string;
    name:        string;
    unified:     string;
    keywords:    string[];
    emoticons:   string[];
    text:        string;
    short_names: string[];
    added_in:    string;
    sheet_x:     number;
    sheet_y:     number;
    search:      string;
}

export interface Sanitized {
    id:        string;
    name:      string;
    colons:    string;
    emoticons: string[];
    unified:   string;
    skin:      null;
    native:    string;
}
