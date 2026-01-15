/**
 * Data Transfer Object para resposta de documento gerado
 */
export class GeneratedDocumentDTO {
    constructor(
        public readonly document: string,
        public readonly type: string
    ) {}
}
