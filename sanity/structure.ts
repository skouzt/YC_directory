import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentListItem()
        .schemaType('author')
        .title('Authors'),
      S.documentListItem()
        .schemaType('startup')
        .title('Startup')
    ],
    )