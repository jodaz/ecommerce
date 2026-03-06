# Supabase Multitenancy Skill

Este es un AI Agent Skill para el proyecto de e-commerce. Guía al asistente sobre cómo interactuar correctamente con el esquema y la base de datos de Supabase.

## Instalación
Este skill ya está incrustado en el proyecto a través del directorio `.agent/skills/`.

## Características
- Define la estructura multitenant por medio de la columna `store_id`.
- Garantiza que el asistente de IA sepa dónde encontrar la instancia del cliente en servidor o navegador (`@supabase/ssr`).
- Provee un patrón estándar para consultar información dentro de un tenant dinámico.
