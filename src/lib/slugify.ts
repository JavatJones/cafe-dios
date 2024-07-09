// slugify.ts
export function generateSlug(text: string): string {
    // Convertir a minúsculas
    let slug = text.toLowerCase();

    // Reemplazar caracteres acentuados y otros caracteres especiales comunes
    const from = "áäâàãåæçéëèêẽíïìîñóöòôõøúüùûýÿž";
    const to   = "aaaaaaaceeeeeiiniiioooooouuuuyyz";
    for (let i = 0, l = from.length; i < l; i++) {
        slug = slug.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    // Reemplazar cualquier carácter no alfanumérico o guion con un espacio
    slug = slug.replace(/[^a-z0-9\s-]/g, '');

    // Reemplazar espacios y guiones múltiples con un solo guion
    slug = slug.replace(/[\s-]+/g, '-');

    // Eliminar guiones al principio o al final
    slug = slug.replace(/^-+|-+$/g, '');

    return slug;
}
