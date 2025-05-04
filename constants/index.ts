

export const darkTailwindColors:string[] = [
    'bg-red-800',
    'bg-blue-800',
    'bg-green-800',
    'bg-yellow-700',
    'bg-purple-800',
    'bg-pink-800',
    'bg-indigo-800',
    'bg-gray-800',
    'bg-slate-800',
    'bg-teal-800',
    'bg-cyan-800',
    'bg-emerald-800',
    'bg-lime-800',
    'bg-amber-800',
    'bg-orange-800',
    'bg-rose-800',
    'bg-violet-800',
    'bg-fuchsia-800',
    'bg-sky-800',
    'bg-zinc-800'
]

export const generateRandomColor = () =>{
    const index = Math.floor(Math.random() * darkTailwindColors.length);
    return darkTailwindColors[index];
}

export const generateUniqueUsername = (fullName: string | null | undefined):string =>{
    if(!fullName){
        const uniqueString:string = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
        return uniqueString;
    }

    const names = fullName.trim().toLowerCase().split(/\s+/);
    const firstName = names[0];
    const lastName = names.length > 1 ? names[names.length - 1] : '';
    const randomNum = Math.floor(100 + Math.random() * 900);
    const now = Date.now().toString().slice(-4);

    const formats = [
        `${firstName}${randomNum}${now}`,
        `${firstName}.${lastName}${randomNum}`,
        `${firstName}_${lastName}${now}`,
        `${lastName}${randomNum}${now}`,
        `${firstName}${lastName.charAt(0)}${randomNum}${now}`
    ];

    const index = Math.floor(Math.random() * formats.length);
    return formats[index];
}