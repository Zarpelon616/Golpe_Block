-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_comentarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "conteudo" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "autorId" INTEGER NOT NULL,
    "publicacaoId" INTEGER NOT NULL,
    CONSTRAINT "comentarios_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comentarios_publicacaoId_fkey" FOREIGN KEY ("publicacaoId") REFERENCES "publicacoes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_comentarios" ("autorId", "conteudo", "dataCriacao", "id", "publicacaoId") SELECT "autorId", "conteudo", "dataCriacao", "id", "publicacaoId" FROM "comentarios";
DROP TABLE "comentarios";
ALTER TABLE "new_comentarios" RENAME TO "comentarios";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
