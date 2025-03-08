│
├── README.md                       # Descripción del proyecto
├── requirements.txt                # Dependencias del proyecto
├── .gitignore                      # Archivos y carpetas ignorados por Git
│
├── 01-investigacion-planificacion/ # Fase 1: Investigación y planificación
│   ├── microclima/                 # Investigación para gestión del microclima
│   │   ├── requisitos.md           # Requisitos del sistema
│   │   ├── datos/                  # Datos iniciales recopilados
│   │   └── notebooks/              # Notebooks de exploración de datos
│   ├── infraestructura/            # Investigación para infraestructuras
│   │   ├── requisitos.md
│   │   ├── datos/
│   │   └── notebooks/
│   ├── algas/                      # Investigación para predicción de algas
│   │   ├── requisitos.md
│   │   ├── datos/
│   │   └── notebooks/
│   └── urbano/                     # Investigación para planificación urbana
│       ├── requisitos.md
│       ├── datos/
│       └── notebooks/
│
├── 02-desarrollo-modelos/          # Fase 2: Desarrollo de modelos de IA
│   ├── microclima/                 # Desarrollo del modelo de microclima
│   │   ├── data_processing.py      # Procesamiento de datos
│   │   ├── model_training.py       # Entrenamiento del modelo
│   │   ├── tests/                  # Pruebas unitarias
│   │   └── notebooks/              # Notebooks de desarrollo
│   ├── infraestructura/            # Desarrollo del modelo de infraestructuras
│   │   ├── data_processing.py
│   │   ├── model_training.py
│   │   ├── tests/
│   │   └── notebooks/
│   ├── algas/                      # Desarrollo del modelo de algas
│   │   ├── data_processing.py
│   │   ├── model_training.py
│   │   ├── tests/
│   │   └── notebooks/
│   └── urbano/                     # Desarrollo del modelo de planificación urbana
│       ├── data_processing.py
│       ├── model_training.py
│       ├── tests/
│       └── notebooks/
│
├── 03-pruebas-validacion/          # Fase 3: Pruebas y validación
│   ├── microclima/                 # Pruebas del modelo de microclima
│   │   ├── resultados/             # Resultados de las pruebas
│   │   ├── informes/               # Informes de validación
│   │   └── ajustes/                # Ajustes realizados al modelo
│   ├── infraestructura/            # Pruebas del modelo de infraestructuras
│   │   ├── resultados/
│   │   ├── informes/
│   │   └── ajustes/
│   ├── algas/                      # Pruebas del modelo de algas
│   │   ├── resultados/
│   │   ├── informes/
│   │   └── ajustes/
│   └── urbano/                     # Pruebas del modelo de planificación urbana
│       ├── resultados/
│       ├── informes/
│       └── ajustes/
│
├── 04-integracion-plataforma/      # Fase 4: Integración y desarrollo de la plataforma
│   ├── microclima/                 # Integración del modelo de microclima
│   │   ├── api/                    # Endpoints de la API
│   │   ├── tests/                  # Pruebas de integración
│   │   └── documentacion/          # Documentación específica
│   ├── infraestructura/            # Integración del modelo de infraestructuras
│   │   ├── api/
│   │   ├── tests/
│   │   └── documentacion/
│   ├── algas/                      # Integración del modelo de algas
│   │   ├── api/
│   │   ├── tests/
│   │   └── documentacion/
│   └── urbano/                     # Integración del modelo de planificación urbana
│       ├── api/
│       ├── tests/
│       └── documentacion/
│
├── 05-implementacion-monitoreo/    # Fase 5: Implementación y monitoreo
│   ├── microclima/                 # Implementación del modelo de microclima
│   │   ├── ciudad_A/               # Implementación en Ciudad A
│   │   └── ciudad_B/               # Implementación en Ciudad B
│   ├── infraestructura/            # Implementación del modelo de infraestructuras
│   │   ├── ciudad_A/
│   │   └── ciudad_B/
│   ├── algas/                      # Implementación del modelo de algas
│   │   ├── ciudad_A/
│   │   └── ciudad_B/
│   └── urbano/                     # Implementación del modelo de planificación urbana
│       ├── ciudad_A/
│       └── ciudad_B/
│
└── docs/                           # Documentación general del proyecto
    ├── guia_usuario.md             # Guía de usuario
    ├── manual_desarrollador.md     # Manual del desarrollador
    └── licencia.md                 # Licencia del proyecto