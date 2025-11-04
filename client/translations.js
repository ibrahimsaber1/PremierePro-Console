// client/translations.js - Multilingual Support for Help Panel

const TRANSLATIONS = {
    en: {
        name: "English",
        flag: "🇬🇧",
        help: {
            title: "Premiere Pro Console Help",
            welcome: "Welcome to Premiere Pro Console!",
            description: "A powerful ExtendScript console for automating Adobe Premiere Pro workflows.",
            
            sections: {
                gettingStarted: "Getting Started",
                shortcuts: "Keyboard Shortcuts",
                features: "Features",
                codeExamples: "Code Examples",
                tips: "Tips & Tricks",
                resources: "Resources"
            },
            
            gettingStarted: {
                intro: "The Premiere Pro Console allows you to execute ExtendScript code directly within Premiere Pro.",
                steps: [
                    "Type your ExtendScript code in the editor",
                    "Press Ctrl+Enter (or click Run button) to execute",
                    "View results in the console output below",
                    "Use autocomplete (Ctrl+Space) for suggestions",
                    "Browse API documentation (F2) for reference"
                ]
            },
            
            shortcuts: [
                { keys: "Ctrl + Enter", desc: "Execute code" },
                { keys: "Ctrl + Space", desc: "Trigger autocomplete" },
                { keys: "Ctrl + Shift + P", desc: "Open code snippets" },
                { keys: "Ctrl + S", desc: "Save code locally" },
                { keys: "Ctrl + O", desc: "Load saved code" },
                { keys: "F1", desc: "Show this help panel" },
                { keys: "F2", desc: "Open API documentation" },
                { keys: "Tab", desc: "Insert 4 spaces (indentation)" },
                { keys: "Esc", desc: "Close active panel" }
            ],
            
            features: [
                {
                    title: "🎯 Autocomplete",
                    desc: "Smart code completion with API suggestions as you type. Press Ctrl+Space to manually trigger."
                },
                {
                    title: "📝 Code Snippets",
                    desc: "Pre-written code examples for common tasks. Access via Ctrl+Shift+P or the Snippets button."
                },
                {
                    title: "📚 API Documentation",
                    desc: "Complete Premiere Pro ExtendScript API reference with searchable documentation for all objects, methods, and properties."
                },
                {
                    title: "💾 Save & Load",
                    desc: "Save your code locally and restore it later. Code persists between sessions automatically."
                },
                {
                    title: "🔍 Console Search",
                    desc: "Filter console output to find specific results quickly."
                },
                {
                    title: "🎨 Code Formatting",
                    desc: "Auto-format your code with proper indentation."
                },
                {
                    title: "⚡ Real-time Execution",
                    desc: "Execute code directly in Premiere Pro and see results immediately."
                }
            ],
            
            examples: [
                {
                    title: "Get Project Information",
                    code: `// Get current project details
$.writeln("Project: " + app.project.name);
$.writeln("Path: " + app.project.path);
$.writeln("Sequences: " + app.project.sequences.numSequences);`
                },
                {
                    title: "List Sequence Markers",
                    code: `// Get all markers in active sequence
var markers = app.project.activeSequence.markers;
var marker = markers.getFirstMarker();
while (marker) {
    $.writeln(marker.name + " at " + marker.start.seconds + "s");
    marker = markers.getNextMarker(marker);
}`
                },
                {
                    title: "Export Sequence",
                    code: `// Export active sequence
var seq = app.project.activeSequence;
seq.exportAsMediaDirect(
    "C:/Output/export.mp4",
    "C:/Presets/H264.epr",
    0  // 0=entire, 1=in-out, 2=work area
);`
                }
            ],
            
            tips: [
                "Use $.writeln() to output text to the console",
                "Access the main application object via 'app'",
                "Most operations return values you can inspect",
                "Check the API Docs (F2) for available methods",
                "Code snippets include working examples for common tasks",
                "Your code is auto-saved between sessions",
                "Use try-catch blocks for error handling"
            ],
            
            links: {
                officialDocs: "Official Premiere Pro Scripting Documentation",
                githubRepo: "GitHub Repository",
                contribute: "Contribute & Report Issues",
                author: "Created by Ibrahim Saber",
                openLink: "Click to open in browser"
            }
        }
    },
    
    ar: {
        name: "العربية",
        flag: "🇸🇦",
        help: {
            title: "مساعدة وحدة تحكم بريمير برو",
            welcome: "مرحباً بك في وحدة تحكم بريمير برو!",
            description: "وحدة تحكم ExtendScript قوية لأتمتة سير العمل في Adobe Premiere Pro.",
            
            sections: {
                gettingStarted: "البدء",
                shortcuts: "اختصارات لوحة المفاتيح",
                features: "المميزات",
                codeExamples: "أمثلة الكود",
                tips: "نصائح وحيل",
                resources: "الموارد"
            },
            
            gettingStarted: {
                intro: "تتيح لك وحدة تحكم بريمير برو تنفيذ كود ExtendScript مباشرة داخل Premiere Pro.",
                steps: [
                    "اكتب كود ExtendScript في المحرر",
                    "اضغط Ctrl+Enter (أو انقر زر التشغيل) للتنفيذ",
                    "عرض النتائج في مخرجات وحدة التحكم أدناه",
                    "استخدم الإكمال التلقائي (Ctrl+Space) للاقتراحات",
                    "تصفح وثائق API (F2) للمرجع"
                ]
            },
            
            shortcuts: [
                { keys: "Ctrl + Enter", desc: "تنفيذ الكود" },
                { keys: "Ctrl + Space", desc: "تشغيل الإكمال التلقائي" },
                { keys: "Ctrl + Shift + P", desc: "فتح مقتطفات الكود" },
                { keys: "Ctrl + S", desc: "حفظ الكود محلياً" },
                { keys: "Ctrl + O", desc: "تحميل الكود المحفوظ" },
                { keys: "F1", desc: "عرض لوحة المساعدة" },
                { keys: "F2", desc: "فتح وثائق API" },
                { keys: "Tab", desc: "إدراج 4 مسافات (مسافة بادئة)" },
                { keys: "Esc", desc: "إغلاق اللوحة النشطة" }
            ],
            
            features: [
                {
                    title: "🎯 الإكمال التلقائي",
                    desc: "إكمال كود ذكي مع اقتراحات API أثناء الكتابة. اضغط Ctrl+Space للتشغيل اليدوي."
                },
                {
                    title: "📝 مقتطفات الكود",
                    desc: "أمثلة كود مكتوبة مسبقاً للمهام الشائعة. الوصول عبر Ctrl+Shift+P أو زر المقتطفات."
                },
                {
                    title: "📚 وثائق API",
                    desc: "مرجع كامل لـ Premiere Pro ExtendScript API مع وثائق قابلة للبحث لجميع الكائنات والطرق والخصائص."
                },
                {
                    title: "💾 حفظ وتحميل",
                    desc: "احفظ الكود محلياً واستعده لاحقاً. يستمر الكود بين الجلسات تلقائياً."
                },
                {
                    title: "🔍 البحث في وحدة التحكم",
                    desc: "تصفية مخرجات وحدة التحكم للعثور على نتائج محددة بسرعة."
                },
                {
                    title: "🎨 تنسيق الكود",
                    desc: "تنسيق تلقائي للكود مع مسافة بادئة صحيحة."
                },
                {
                    title: "⚡ تنفيذ فوري",
                    desc: "تنفيذ الكود مباشرة في Premiere Pro ورؤية النتائج فوراً."
                }
            ],
            
            examples: [
                {
                    title: "الحصول على معلومات المشروع",
                    code: `// الحصول على تفاصيل المشروع الحالي
$.writeln("المشروع: " + app.project.name);
$.writeln("المسار: " + app.project.path);
$.writeln("التسلسلات: " + app.project.sequences.numSequences);`
                },
                {
                    title: "قائمة علامات التسلسل",
                    code: `// الحصول على جميع العلامات في التسلسل النشط
var markers = app.project.activeSequence.markers;
var marker = markers.getFirstMarker();
while (marker) {
    $.writeln(marker.name + " عند " + marker.start.seconds + "ث");
    marker = markers.getNextMarker(marker);
}`
                },
                {
                    title: "تصدير التسلسل",
                    code: `// تصدير التسلسل النشط
var seq = app.project.activeSequence;
seq.exportAsMediaDirect(
    "C:/Output/export.mp4",
    "C:/Presets/H264.epr",
    0  // 0=كامل، 1=من-إلى، 2=منطقة العمل
);`
                }
            ],
            
            tips: [
                "استخدم $.writeln() لإخراج النص إلى وحدة التحكم",
                "الوصول إلى كائن التطبيق الرئيسي عبر 'app'",
                "معظم العمليات تعيد قيماً يمكنك فحصها",
                "تحقق من وثائق API (F2) للطرق المتاحة",
                "تتضمن مقتطفات الكود أمثلة عملية للمهام الشائعة",
                "يتم حفظ الكود تلقائياً بين الجلسات",
                "استخدم كتل try-catch للتعامل مع الأخطاء"
            ],
            
        links: {
            officialDocs: "وثائق برمجة Premiere Pro الرسمية",
            githubRepo: "مستودع GitHub",
            contribute: "المساهمة والإبلاغ عن المشكلات",
            author: "أنشأه إبراهيم صابر",
            openLink: "انقر للفتح في المتصفح"
        }
        }
    },
    
    es: {
        name: "Español",
        flag: "🇪🇸",
        help: {
            title: "Ayuda de Consola de Premiere Pro",
            welcome: "¡Bienvenido a la Consola de Premiere Pro!",
            description: "Una potente consola ExtendScript para automatizar flujos de trabajo de Adobe Premiere Pro.",
            
            sections: {
                gettingStarted: "Comenzando",
                shortcuts: "Atajos de Teclado",
                features: "Características",
                codeExamples: "Ejemplos de Código",
                tips: "Consejos y Trucos",
                resources: "Recursos"
            },
            
            gettingStarted: {
                intro: "La Consola de Premiere Pro te permite ejecutar código ExtendScript directamente en Premiere Pro.",
                steps: [
                    "Escribe tu código ExtendScript en el editor",
                    "Presiona Ctrl+Enter (o haz clic en Ejecutar) para ejecutar",
                    "Ver resultados en la salida de consola abajo",
                    "Usa autocompletar (Ctrl+Space) para sugerencias",
                    "Explora la documentación API (F2) como referencia"
                ]
            },
            
            shortcuts: [
                { keys: "Ctrl + Enter", desc: "Ejecutar código" },
                { keys: "Ctrl + Space", desc: "Activar autocompletado" },
                { keys: "Ctrl + Shift + P", desc: "Abrir fragmentos de código" },
                { keys: "Ctrl + S", desc: "Guardar código localmente" },
                { keys: "Ctrl + O", desc: "Cargar código guardado" },
                { keys: "F1", desc: "Mostrar este panel de ayuda" },
                { keys: "F2", desc: "Abrir documentación API" },
                { keys: "Tab", desc: "Insertar 4 espacios (sangría)" },
                { keys: "Esc", desc: "Cerrar panel activo" }
            ],
            
            features: [
                {
                    title: "🎯 Autocompletado",
                    desc: "Completado de código inteligente con sugerencias API mientras escribes. Presiona Ctrl+Space para activar manualmente."
                },
                {
                    title: "📝 Fragmentos de Código",
                    desc: "Ejemplos de código preescritos para tareas comunes. Accede con Ctrl+Shift+P o el botón Snippets."
                },
                {
                    title: "📚 Documentación API",
                    desc: "Referencia completa de Premiere Pro ExtendScript API con documentación buscable para todos los objetos, métodos y propiedades."
                },
                {
                    title: "💾 Guardar y Cargar",
                    desc: "Guarda tu código localmente y restáuralo después. El código persiste entre sesiones automáticamente."
                },
                {
                    title: "🔍 Búsqueda en Consola",
                    desc: "Filtra la salida de consola para encontrar resultados específicos rápidamente."
                },
                {
                    title: "🎨 Formato de Código",
                    desc: "Formatea automáticamente tu código con sangría apropiada."
                },
                {
                    title: "⚡ Ejecución en Tiempo Real",
                    desc: "Ejecuta código directamente en Premiere Pro y ve resultados inmediatamente."
                }
            ],
            
            examples: [
                {
                    title: "Obtener Información del Proyecto",
                    code: `// Obtener detalles del proyecto actual
$.writeln("Proyecto: " + app.project.name);
$.writeln("Ruta: " + app.project.path);
$.writeln("Secuencias: " + app.project.sequences.numSequences);`
                },
                {
                    title: "Listar Marcadores de Secuencia",
                    code: `// Obtener todos los marcadores en secuencia activa
var markers = app.project.activeSequence.markers;
var marker = markers.getFirstMarker();
while (marker) {
    $.writeln(marker.name + " en " + marker.start.seconds + "s");
    marker = markers.getNextMarker(marker);
}`
                },
                {
                    title: "Exportar Secuencia",
                    code: `// Exportar secuencia activa
var seq = app.project.activeSequence;
seq.exportAsMediaDirect(
    "C:/Output/export.mp4",
    "C:/Presets/H264.epr",
    0  // 0=completo, 1=entrada-salida, 2=área de trabajo
);`
                }
            ],
            
            tips: [
                "Usa $.writeln() para imprimir texto en la consola",
                "Accede al objeto de aplicación principal vía 'app'",
                "La mayoría de operaciones devuelven valores que puedes inspeccionar",
                "Revisa los Docs API (F2) para métodos disponibles",
                "Los fragmentos de código incluyen ejemplos funcionales para tareas comunes",
                "Tu código se guarda automáticamente entre sesiones",
                "Usa bloques try-catch para manejo de errores"
            ],
            
            links: {
                officialDocs: "Documentación Oficial de Scripting de Premiere Pro",
                openLink: "Clic para abrir en navegador"
            }
        }
    },
    
    zh: {
        name: "中文",
        flag: "🇨🇳",
        help: {
            title: "Premiere Pro 控制台帮助",
            welcome: "欢迎使用 Premiere Pro 控制台！",
            description: "用于自动化 Adobe Premiere Pro 工作流程的强大 ExtendScript 控制台。",
            
            sections: {
                gettingStarted: "入门",
                shortcuts: "键盘快捷键",
                features: "功能",
                codeExamples: "代码示例",
                tips: "提示与技巧",
                resources: "资源"
            },
            
            gettingStarted: {
                intro: "Premiere Pro 控制台允许您直接在 Premiere Pro 中执行 ExtendScript 代码。",
                steps: [
                    "在编辑器中输入您的 ExtendScript 代码",
                    "按 Ctrl+Enter（或点击运行按钮）执行",
                    "在下方的控制台输出中查看结果",
                    "使用自动完成（Ctrl+Space）获取建议",
                    "浏览 API 文档（F2）作为参考"
                ]
            },
            
            shortcuts: [
                { keys: "Ctrl + Enter", desc: "执行代码" },
                { keys: "Ctrl + Space", desc: "触发自动完成" },
                { keys: "Ctrl + Shift + P", desc: "打开代码片段" },
                { keys: "Ctrl + S", desc: "本地保存代码" },
                { keys: "Ctrl + O", desc: "加载已保存代码" },
                { keys: "F1", desc: "显示此帮助面板" },
                { keys: "F2", desc: "打开 API 文档" },
                { keys: "Tab", desc: "插入 4 个空格（缩进）" },
                { keys: "Esc", desc: "关闭活动面板" }
            ],
            
            features: [
                {
                    title: "🎯 自动完成",
                    desc: "智能代码完成，在您输入时提供 API 建议。按 Ctrl+Space 手动触发。"
                },
                {
                    title: "📝 代码片段",
                    desc: "常见任务的预写代码示例。通过 Ctrl+Shift+P 或 Snippets 按钮访问。"
                },
                {
                    title: "📚 API 文档",
                    desc: "完整的 Premiere Pro ExtendScript API 参考，包含所有对象、方法和属性的可搜索文档。"
                },
                {
                    title: "💾 保存与加载",
                    desc: "在本地保存代码并稍后恢复。代码在会话之间自动保留。"
                },
                {
                    title: "🔍 控制台搜索",
                    desc: "过滤控制台输出以快速查找特定结果。"
                },
                {
                    title: "🎨 代码格式化",
                    desc: "使用适当的缩进自动格式化代码。"
                },
                {
                    title: "⚡ 实时执行",
                    desc: "直接在 Premiere Pro 中执行代码并立即查看结果。"
                }
            ],
            
            examples: [
                {
                    title: "获取项目信息",
                    code: `// 获取当前项目详情
$.writeln("项目: " + app.project.name);
$.writeln("路径: " + app.project.path);
$.writeln("序列: " + app.project.sequences.numSequences);`
                },
                {
                    title: "列出序列标记",
                    code: `// 获取活动序列中的所有标记
var markers = app.project.activeSequence.markers;
var marker = markers.getFirstMarker();
while (marker) {
    $.writeln(marker.name + " 在 " + marker.start.seconds + "秒");
    marker = markers.getNextMarker(marker);
}`
                },
                {
                    title: "导出序列",
                    code: `// 导出活动序列
var seq = app.project.activeSequence;
seq.exportAsMediaDirect(
    "C:/Output/export.mp4",
    "C:/Presets/H264.epr",
    0  // 0=完整，1=入出点，2=工作区
);`
                }
            ],
            
            tips: [
                "使用 $.writeln() 向控制台输出文本",
                "通过 'app' 访问主应用程序对象",
                "大多数操作返回您可以检查的值",
                "查看 API 文档（F2）了解可用方法",
                "代码片段包含常见任务的工作示例",
                "您的代码在会话之间自动保存",
                "使用 try-catch 块进行错误处理"
            ],
            
            links: {
                officialDocs: "Premiere Pro 官方脚本文档",
                openLink: "点击在浏览器中打开"
            }
        }
    },
    
    fr: {
        name: "Français",
        flag: "🇫🇷",
        help: {
            title: "Aide Console Premiere Pro",
            welcome: "Bienvenue dans la Console Premiere Pro !",
            description: "Une console ExtendScript puissante pour automatiser les flux de travail Adobe Premiere Pro.",
            
            sections: {
                gettingStarted: "Démarrage",
                shortcuts: "Raccourcis Clavier",
                features: "Fonctionnalités",
                codeExamples: "Exemples de Code",
                tips: "Astuces et Conseils",
                resources: "Ressources"
            },
            
            gettingStarted: {
                intro: "La Console Premiere Pro vous permet d'exécuter du code ExtendScript directement dans Premiere Pro.",
                steps: [
                    "Tapez votre code ExtendScript dans l'éditeur",
                    "Appuyez sur Ctrl+Entrée (ou cliquez sur Exécuter) pour exécuter",
                    "Voir les résultats dans la sortie de la console ci-dessous",
                    "Utilisez l'autocomplétion (Ctrl+Espace) pour les suggestions",
                    "Parcourez la documentation API (F2) pour référence"
                ]
            },
            
            shortcuts: [
                { keys: "Ctrl + Entrée", desc: "Exécuter le code" },
                { keys: "Ctrl + Espace", desc: "Déclencher l'autocomplétion" },
                { keys: "Ctrl + Shift + P", desc: "Ouvrir les extraits de code" },
                { keys: "Ctrl + S", desc: "Enregistrer le code localement" },
                { keys: "Ctrl + O", desc: "Charger le code enregistré" },
                { keys: "F1", desc: "Afficher ce panneau d'aide" },
                { keys: "F2", desc: "Ouvrir la documentation API" },
                { keys: "Tab", desc: "Insérer 4 espaces (indentation)" },
                { keys: "Échap", desc: "Fermer le panneau actif" }
            ],
            
            features: [
                {
                    title: "🎯 Autocomplétion",
                    desc: "Complétion de code intelligente avec suggestions API pendant la frappe. Appuyez sur Ctrl+Espace pour déclencher manuellement."
                },
                {
                    title: "📝 Extraits de Code",
                    desc: "Exemples de code pré-écrits pour tâches courantes. Accédez via Ctrl+Shift+P ou le bouton Snippets."
                },
                {
                    title: "📚 Documentation API",
                    desc: "Référence complète de l'API ExtendScript Premiere Pro avec documentation recherchable pour tous les objets, méthodes et propriétés."
                },
                {
                    title: "💾 Enregistrer et Charger",
                    desc: "Enregistrez votre code localement et restaurez-le plus tard. Le code persiste entre les sessions automatiquement."
                },
                {
                    title: "🔍 Recherche Console",
                    desc: "Filtrez la sortie de la console pour trouver rapidement des résultats spécifiques."
                },
                {
                    title: "🎨 Formatage du Code",
                    desc: "Formatez automatiquement votre code avec une indentation appropriée."
                },
                {
                    title: "⚡ Exécution en Temps Réel",
                    desc: "Exécutez du code directement dans Premiere Pro et voyez les résultats immédiatement."
                }
            ],
            
            examples: [
                {
                    title: "Obtenir les Informations du Projet",
                    code: `// Obtenir les détails du projet actuel
$.writeln("Projet: " + app.project.name);
$.writeln("Chemin: " + app.project.path);
$.writeln("Séquences: " + app.project.sequences.numSequences);`
                },
                {
                    title: "Lister les Marqueurs de Séquence",
                    code: `// Obtenir tous les marqueurs dans la séquence active
var markers = app.project.activeSequence.markers;
var marker = markers.getFirstMarker();
while (marker) {
    $.writeln(marker.name + " à " + marker.start.seconds + "s");
    marker = markers.getNextMarker(marker);
}`
                },
                {
                    title: "Exporter la Séquence",
                    code: `// Exporter la séquence active
var seq = app.project.activeSequence;
seq.exportAsMediaDirect(
    "C:/Output/export.mp4",
    "C:/Presets/H264.epr",
    0  // 0=entier, 1=in-out, 2=zone de travail
);`
                }
            ],
            
            tips: [
                "Utilisez $.writeln() pour afficher du texte dans la console",
                "Accédez à l'objet application principal via 'app'",
                "La plupart des opérations retournent des valeurs que vous pouvez inspecter",
                "Consultez les Docs API (F2) pour les méthodes disponibles",
                "Les extraits de code incluent des exemples fonctionnels pour les tâches courantes",
                "Votre code est automatiquement enregistré entre les sessions",
                "Utilisez des blocs try-catch pour la gestion des erreurs"
            ],
            
            links: {
                officialDocs: "Documentation Officielle de Scripting Premiere Pro",
                openLink: "Cliquer pour ouvrir dans le navigateur"
            }
        }
    },
    
    hi: {
        name: "हिन्दी",
        flag: "🇮🇳",
        help: {
            title: "प्रीमियर प्रो कंसोल सहायता",
            welcome: "प्रीमियर प्रो कंसोल में आपका स्वागत है!",
            description: "Adobe Premiere Pro वर्कफ़्लो को स्वचालित करने के लिए एक शक्तिशाली ExtendScript कंसोल।",
            
            sections: {
                gettingStarted: "शुरुआत करना",
                shortcuts: "कीबोर्ड शॉर्टकट",
                features: "विशेषताएं",
                codeExamples: "कोड उदाहरण",
                tips: "सुझाव और ट्रिक्स",
                resources: "संसाधन"
            },
            
            gettingStarted: {
                intro: "प्रीमियर प्रो कंसोल आपको Premiere Pro के भीतर सीधे ExtendScript कोड निष्पादित करने की अनुमति देता है।",
                steps: [
                    "संपादक में अपना ExtendScript कोड टाइप करें",
                    "निष्पादित करने के लिए Ctrl+Enter दबाएं (या रन बटन पर क्लिक करें)",
                    "नीचे कंसोल आउटपुट में परिणाम देखें",
                    "सुझावों के लिए ऑटोकम्पलीट (Ctrl+Space) का उपयोग करें",
                    "संदर्भ के लिए API दस्तावेज़ (F2) ब्राउज़ करें"
                ]
            },
            
            shortcuts: [
                { keys: "Ctrl + Enter", desc: "कोड निष्पादित करें" },
                { keys: "Ctrl + Space", desc: "ऑटोकम्पलीट ट्रिगर करें" },
                { keys: "Ctrl + Shift + P", desc: "कोड स्निपेट खोलें" },
                { keys: "Ctrl + S", desc: "कोड स्थानीय रूप से सहेजें" },
                { keys: "Ctrl + O", desc: "सहेजा गया कोड लोड करें" },
                { keys: "F1", desc: "यह सहायता पैनल दिखाएं" },
                { keys: "F2", desc: "API दस्तावेज़ खोलें" },
                { keys: "Tab", desc: "4 रिक्त स्थान डालें (इंडेंटेशन)" },
                { keys: "Esc", desc: "सक्रिय पैनल बंद करें" }
            ],
            
            features: [
                {
                    title: "🎯 ऑटोकम्पलीट",
                    desc: "टाइप करते समय API सुझावों के साथ स्मार्ट कोड पूर्णता। मैन्युअल रूप से ट्रिगर करने के लिए Ctrl+Space दबाएं।"
                },
                {
                    title: "📝 कोड स्निपेट",
                    desc: "सामान्य कार्यों के लिए पूर्व-लिखित कोड उदाहरण। Ctrl+Shift+P या Snippets बटन के माध्यम से एक्सेस करें।"
                },
                {
                    title: "📚 API दस्तावेज़",
                    desc: "सभी ऑब्जेक्ट, विधियों और गुणों के लिए खोज योग्य दस्तावेज़ के साथ पूर्ण Premiere Pro ExtendScript API संदर्भ।"
                },
                {
                    title: "💾 सहेजें और लोड करें",
                    desc: "अपने कोड को स्थानीय रूप से सहेजें और बाद में पुनर्स्थापित करें। कोड सत्रों के बीच स्वचालित रूप से बना रहता है।"
                },
                {
                    title: "🔍 कंसोल खोज",
                    desc: "विशिष्ट परिणामों को तेज़ी से खोजने के लिए कंसोल आउटपुट फ़िल्टर करें।"
                },
                {
                    title: "🎨 कोड फ़ॉर्मेटिंग",
                    desc: "उचित इंडेंटेशन के साथ अपने कोड को स्वचालित रूप से प्रारूपित करें।"
                },
                {
                    title: "⚡ रियल-टाइम निष्पादन",
                    desc: "सीधे Premiere Pro में कोड निष्पादित करें और तुरंत परिणाम देखें।"
                }
            ],
            
            examples: [
                {
                    title: "प्रोजेक्ट जानकारी प्राप्त करें",
                    code: `// वर्तमान प्रोजेक्ट विवरण प्राप्त करें
$.writeln("प्रोजेक्ट: " + app.project.name);
$.writeln("पथ: " + app.project.path);
$.writeln("अनुक्रम: " + app.project.sequences.numSequences);`
                },
                {
                    title: "अनुक्रम मार्कर सूचीबद्ध करें",
                    code: `// सक्रिय अनुक्रम में सभी मार्कर प्राप्त करें
var markers = app.project.activeSequence.markers;
var marker = markers.getFirstMarker();
while (marker) {
    $.writeln(marker.name + " पर " + marker.start.seconds + "s");
    marker = markers.getNextMarker(marker);
}`
                },
                {
                    title: "अनुक्रम निर्यात करें",
                    code: `// सक्रिय अनुक्रम निर्यात करें
var seq = app.project.activeSequence;
seq.exportAsMediaDirect(
    "C:/Output/export.mp4",
    "C:/Presets/H264.epr",
    0  // 0=संपूर्ण, 1=इन-आउट, 2=कार्य क्षेत्र
);`
                }
            ],
            
            tips: [
                "कंसोल में टेक्स्ट आउटपुट करने के लिए $.writeln() का उपयोग करें",
                "'app' के माध्यम से मुख्य एप्लिकेशन ऑब्जेक्ट तक पहुंचें",
                "अधिकांश ऑपरेशन मान लौटाते हैं जिन्हें आप निरीक्षण कर सकते हैं",
                "उपलब्ध विधियों के लिए API डॉक्स (F2) देखें",
                "कोड स्निपेट में सामान्य कार्यों के लिए कार्यशील उदाहरण शामिल हैं",
                "आपका कोड सत्रों के बीच स्वचालित रूप से सहेजा जाता है",
                "त्रुटि प्रबंधन के लिए try-catch ब्लॉक का उपयोग करें"
            ],
            
            links: {
                officialDocs: "आधिकारिक Premiere Pro स्क्रिप्टिंग दस्तावेज़",
                openLink: "ब्राउज़र में खोलने के लिए क्लिक करें"
            }
        }
    },
    
    de: {
        name: "Deutsch",
        flag: "🇩🇪",
        help: {
            title: "Premiere Pro Konsole Hilfe",
            welcome: "Willkommen bei der Premiere Pro Konsole!",
            description: "Eine leistungsstarke ExtendScript-Konsole zur Automatisierung von Adobe Premiere Pro-Workflows.",
            
            sections: {
                gettingStarted: "Erste Schritte",
                shortcuts: "Tastenkombinationen",
                features: "Funktionen",
                codeExamples: "Code-Beispiele",
                tips: "Tipps & Tricks",
                resources: "Ressourcen"
            },
            
            gettingStarted: {
                intro: "Die Premiere Pro-Konsole ermöglicht es Ihnen, ExtendScript-Code direkt in Premiere Pro auszuführen.",
                steps: [
                    "Geben Sie Ihren ExtendScript-Code im Editor ein",
                    "Drücken Sie Strg+Eingabe (oder klicken Sie auf Ausführen)",
                    "Ergebnisse in der Konsolenausgabe unten anzeigen",
                    "Verwenden Sie die Autovervollständigung (Strg+Leertaste) für Vorschläge",
                    "Durchsuchen Sie die API-Dokumentation (F2) als Referenz"
                ]
            },
            
            shortcuts: [
                { keys: "Strg + Eingabe", desc: "Code ausführen" },
                { keys: "Strg + Leertaste", desc: "Autovervollständigung auslösen" },
                { keys: "Strg + Umschalt + P", desc: "Code-Snippets öffnen" },
                { keys: "Strg + S", desc: "Code lokal speichern" },
                { keys: "Strg + O", desc: "Gespeicherten Code laden" },
                { keys: "F1", desc: "Dieses Hilfefenster anzeigen" },
                { keys: "F2", desc: "API-Dokumentation öffnen" },
                { keys: "Tab", desc: "4 Leerzeichen einfügen (Einrückung)" },
                { keys: "Esc", desc: "Aktives Fenster schließen" }
            ],
            
            features: [
                {
                    title: "🎯 Autovervollständigung",
                    desc: "Intelligente Code-Vervollständigung mit API-Vorschlägen während der Eingabe. Drücken Sie Strg+Leertaste zum manuellen Auslösen."
                },
                {
                    title: "📝 Code-Snippets",
                    desc: "Vorgefertigte Code-Beispiele für gängige Aufgaben. Zugriff über Strg+Umschalt+P oder die Snippets-Schaltfläche."
                },
                {
                    title: "📚 API-Dokumentation",
                    desc: "Vollständige Premiere Pro ExtendScript-API-Referenz mit durchsuchbarer Dokumentation für alle Objekte, Methoden und Eigenschaften."
                },
                {
                    title: "💾 Speichern & Laden",
                    desc: "Speichern Sie Ihren Code lokal und stellen Sie ihn später wieder her. Code bleibt zwischen Sitzungen automatisch erhalten."
                },
                {
                    title: "🔍 Konsolensuche",
                    desc: "Filtern Sie die Konsolenausgabe, um schnell bestimmte Ergebnisse zu finden."
                },
                {
                    title: "🎨 Code-Formatierung",
                    desc: "Formatieren Sie Ihren Code automatisch mit korrekter Einrückung."
                },
                {
                    title: "⚡ Echtzeitausführung",
                    desc: "Führen Sie Code direkt in Premiere Pro aus und sehen Sie sofort Ergebnisse."
                }
            ],
            
            examples: [
                {
                    title: "Projektinformationen abrufen",
                    code: `// Aktuelle Projektdetails abrufen
$.writeln("Projekt: " + app.project.name);
$.writeln("Pfad: " + app.project.path);
$.writeln("Sequenzen: " + app.project.sequences.numSequences);`
                },
                {
                    title: "Sequenz-Marker auflisten",
                    code: `// Alle Marker in aktiver Sequenz abrufen
var markers = app.project.activeSequence.markers;
var marker = markers.getFirstMarker();
while (marker) {
    $.writeln(marker.name + " bei " + marker.start.seconds + "s");
    marker = markers.getNextMarker(marker);
}`
                },
                {
                    title: "Sequenz exportieren",
                    code: `// Aktive Sequenz exportieren
var seq = app.project.activeSequence;
seq.exportAsMediaDirect(
    "C:/Output/export.mp4",
    "C:/Presets/H264.epr",
    0  // 0=vollständig, 1=Ein-Aus, 2=Arbeitsbereich
);`
                }
            ],
            
            tips: [
                "Verwenden Sie $.writeln() zur Textausgabe in der Konsole",
                "Zugriff auf das Hauptanwendungsobjekt über 'app'",
                "Die meisten Operationen geben Werte zurück, die Sie überprüfen können",
                "Prüfen Sie die API-Dokumentation (F2) für verfügbare Methoden",
                "Code-Snippets enthalten funktionierende Beispiele für gängige Aufgaben",
                "Ihr Code wird automatisch zwischen Sitzungen gespeichert",
                "Verwenden Sie try-catch-Blöcke zur Fehlerbehandlung"
            ],
            
            links: {
                officialDocs: "Offizielle Premiere Pro Scripting-Dokumentation",
                openLink: "Zum Öffnen im Browser klicken"
            }
        }
    },
    
    pt: {
        name: "Português",
        flag: "🇧🇷",
        help: {
            title: "Ajuda do Console Premiere Pro",
            welcome: "Bem-vindo ao Console Premiere Pro!",
            description: "Um poderoso console ExtendScript para automatizar fluxos de trabalho do Adobe Premiere Pro.",
            
            sections: {
                gettingStarted: "Começando",
                shortcuts: "Atalhos de Teclado",
                features: "Recursos",
                codeExamples: "Exemplos de Código",
                tips: "Dicas e Truques",
                resources: "Recursos"
            },
            
            gettingStarted: {
                intro: "O Console Premiere Pro permite executar código ExtendScript diretamente no Premiere Pro.",
                steps: [
                    "Digite seu código ExtendScript no editor",
                    "Pressione Ctrl+Enter (ou clique em Executar) para executar",
                    "Visualizar resultados na saída do console abaixo",
                    "Use o preenchimento automático (Ctrl+Espaço) para sugestões",
                    "Navegue pela documentação da API (F2) como referência"
                ]
            },
            
            shortcuts: [
                { keys: "Ctrl + Enter", desc: "Executar código" },
                { keys: "Ctrl + Espaço", desc: "Acionar preenchimento automático" },
                { keys: "Ctrl + Shift + P", desc: "Abrir trechos de código" },
                { keys: "Ctrl + S", desc: "Salvar código localmente" },
                { keys: "Ctrl + O", desc: "Carregar código salvo" },
                { keys: "F1", desc: "Mostrar este painel de ajuda" },
                { keys: "F2", desc: "Abrir documentação da API" },
                { keys: "Tab", desc: "Inserir 4 espaços (indentação)" },
                { keys: "Esc", desc: "Fechar painel ativo" }
            ],
            
            features: [
                {
                    title: "🎯 Preenchimento Automático",
                    desc: "Conclusão inteligente de código com sugestões da API enquanto você digita. Pressione Ctrl+Espaço para acionar manualmente."
                },
                {
                    title: "📝 Trechos de Código",
                    desc: "Exemplos de código pré-escritos para tarefas comuns. Acesse via Ctrl+Shift+P ou botão Snippets."
                },
                {
                    title: "📚 Documentação da API",
                    desc: "Referência completa da API ExtendScript do Premiere Pro com documentação pesquisável para todos os objetos, métodos e propriedades."
                },
                {
                    title: "💾 Salvar e Carregar",
                    desc: "Salve seu código localmente e restaure-o depois. O código persiste entre sessões automaticamente."
                },
                {
                    title: "🔍 Pesquisa no Console",
                    desc: "Filtre a saída do console para encontrar resultados específicos rapidamente."
                },
                {
                    title: "🎨 Formatação de Código",
                    desc: "Formate automaticamente seu código com indentação adequada."
                },
                {
                    title: "⚡ Execução em Tempo Real",
                    desc: "Execute código diretamente no Premiere Pro e veja os resultados imediatamente."
                }
            ],
            
            examples: [
                {
                    title: "Obter Informações do Projeto",
                    code: `// Obter detalhes do projeto atual
$.writeln("Projeto: " + app.project.name);
$.writeln("Caminho: " + app.project.path);
$.writeln("Sequências: " + app.project.sequences.numSequences);`
                },
                {
                    title: "Listar Marcadores de Sequência",
                    code: `// Obter todos os marcadores na sequência ativa
var markers = app.project.activeSequence.markers;
var marker = markers.getFirstMarker();
while (marker) {
    $.writeln(marker.name + " em " + marker.start.seconds + "s");
    marker = markers.getNextMarker(marker);
}`
                },
                {
                    title: "Exportar Sequência",
                    code: `// Exportar sequência ativa
var seq = app.project.activeSequence;
seq.exportAsMediaDirect(
    "C:/Output/export.mp4",
    "C:/Presets/H264.epr",
    0  // 0=completo, 1=in-out, 2=área de trabalho
);`
                }
            ],
            
            tips: [
                "Use $.writeln() para imprimir texto no console",
                "Acesse o objeto principal do aplicativo via 'app'",
                "A maioria das operações retorna valores que você pode inspecionar",
                "Verifique os Docs da API (F2) para métodos disponíveis",
                "Os trechos de código incluem exemplos funcionais para tarefas comuns",
                "Seu código é salvo automaticamente entre sessões",
                "Use blocos try-catch para tratamento de erros"
            ],
            
            links: {
                officialDocs: "Documentação Oficial de Scripting do Premiere Pro",
                openLink: "Clique para abrir no navegador"
            }
        }
    },
    
    it: {
        name: "Italiano",
        flag: "🇮🇹",
        help: {
            title: "Aiuto Console Premiere Pro",
            welcome: "Benvenuto nella Console Premiere Pro!",
            description: "Una potente console ExtendScript per automatizzare i flussi di lavoro di Adobe Premiere Pro.",
            
            sections: {
                gettingStarted: "Per Iniziare",
                shortcuts: "Scorciatoie da Tastiera",
                features: "Funzionalità",
                codeExamples: "Esempi di Codice",
                tips: "Suggerimenti e Trucchi",
                resources: "Risorse"
            },
            
            gettingStarted: {
                intro: "La Console Premiere Pro ti permette di eseguire codice ExtendScript direttamente in Premiere Pro.",
                steps: [
                    "Digita il tuo codice ExtendScript nell'editor",
                    "Premi Ctrl+Invio (o clicca su Esegui) per eseguire",
                    "Visualizza i risultati nell'output della console qui sotto",
                    "Usa il completamento automatico (Ctrl+Spazio) per suggerimenti",
                    "Sfoglia la documentazione API (F2) come riferimento"
                ]
            },
            
            shortcuts: [
                { keys: "Ctrl + Invio", desc: "Esegui codice" },
                { keys: "Ctrl + Spazio", desc: "Attiva completamento automatico" },
                { keys: "Ctrl + Shift + P", desc: "Apri frammenti di codice" },
                { keys: "Ctrl + S", desc: "Salva codice localmente" },
                { keys: "Ctrl + O", desc: "Carica codice salvato" },
                { keys: "F1", desc: "Mostra questo pannello di aiuto" },
                { keys: "F2", desc: "Apri documentazione API" },
                { keys: "Tab", desc: "Inserisci 4 spazi (indentazione)" },
                { keys: "Esc", desc: "Chiudi pannello attivo" }
            ],
            
            features: [
                {
                    title: "🎯 Completamento Automatico",
                    desc: "Completamento intelligente del codice con suggerimenti API mentre digiti. Premi Ctrl+Spazio per attivare manualmente."
                },
                {
                    title: "📝 Frammenti di Codice",
                    desc: "Esempi di codice pre-scritti per attività comuni. Accedi tramite Ctrl+Shift+P o il pulsante Snippets."
                },
                {
                    title: "📚 Documentazione API",
                    desc: "Riferimento completo API ExtendScript Premiere Pro con documentazione ricercabile per tutti gli oggetti, metodi e proprietà."
                },
                {
                    title: "💾 Salva e Carica",
                    desc: "Salva il tuo codice localmente e ripristinalo in seguito. Il codice persiste tra le sessioni automaticamente."
                },
                {
                    title: "🔍 Ricerca Console",
                    desc: "Filtra l'output della console per trovare rapidamente risultati specifici."
                },
                {
                    title: "🎨 Formattazione Codice",
                    desc: "Formatta automaticamente il tuo codice con indentazione appropriata."
                },
                {
                    title: "⚡ Esecuzione in Tempo Reale",
                    desc: "Esegui codice direttamente in Premiere Pro e vedi i risultati immediatamente."
                }
            ],
            
            examples: [
                {
                    title: "Ottieni Informazioni Progetto",
                    code: `// Ottieni dettagli progetto corrente
$.writeln("Progetto: " + app.project.name);
$.writeln("Percorso: " + app.project.path);
$.writeln("Sequenze: " + app.project.sequences.numSequences);`
                },
                {
                    title: "Elenca Marcatori Sequenza",
                    code: `// Ottieni tutti i marcatori nella sequenza attiva
var markers = app.project.activeSequence.markers;
var marker = markers.getFirstMarker();
while (marker) {
    $.writeln(marker.name + " a " + marker.start.seconds + "s");
    marker = markers.getNextMarker(marker);
}`
                },
                {
                    title: "Esporta Sequenza",
                    code: `// Esporta sequenza attiva
var seq = app.project.activeSequence;
seq.exportAsMediaDirect(
    "C:/Output/export.mp4",
    "C:/Presets/H264.epr",
    0  // 0=intero, 1=in-out, 2=area di lavoro
);`
                }
            ],
            
            tips: [
                "Usa $.writeln() per stampare testo nella console",
                "Accedi all'oggetto applicazione principale tramite 'app'",
                "La maggior parte delle operazioni restituisce valori che puoi ispezionare",
                "Controlla i Docs API (F2) per i metodi disponibili",
                "I frammenti di codice includono esempi funzionanti per attività comuni",
                "Il tuo codice viene salvato automaticamente tra le sessioni",
                "Usa blocchi try-catch per la gestione degli errori"
            ],
            
            links: {
                officialDocs: "Documentazione Ufficiale Scripting Premiere Pro",
                openLink: "Clicca per aprire nel browser"
            }
        }
    },
    
    tr: {
        name: "Türkçe",
        flag: "🇹🇷",
        help: {
            title: "Premiere Pro Konsol Yardımı",
            welcome: "Premiere Pro Konsol'a Hoş Geldiniz!",
            description: "Adobe Premiere Pro iş akışlarını otomatikleştirmek için güçlü bir ExtendScript konsolu.",
            
            sections: {
                gettingStarted: "Başlarken",
                shortcuts: "Klavye Kısayolları",
                features: "Özellikler",
                codeExamples: "Kod Örnekleri",
                tips: "İpuçları ve Püf Noktaları",
                resources: "Kaynaklar"
            },
            
            gettingStarted: {
                intro: "Premiere Pro Konsolu, ExtendScript kodunu doğrudan Premiere Pro içinde çalıştırmanıza olanak tanır.",
                steps: [
                    "ExtendScript kodunuzu editöre yazın",
                    "Çalıştırmak için Ctrl+Enter'a basın (veya Çalıştır düğmesine tıklayın)",
                    "Sonuçları aşağıdaki konsol çıktısında görün",
                    "Öneriler için otomatik tamamlamayı (Ctrl+Space) kullanın",
                    "Referans için API belgelerine (F2) göz atın"
                ]
            },
            
            shortcuts: [
                { keys: "Ctrl + Enter", desc: "Kodu çalıştır" },
                { keys: "Ctrl + Space", desc: "Otomatik tamamlamayı tetikle" },
                { keys: "Ctrl + Shift + P", desc: "Kod parçacıklarını aç" },
                { keys: "Ctrl + S", desc: "Kodu yerel olarak kaydet" },
                { keys: "Ctrl + O", desc: "Kaydedilmiş kodu yükle" },
                { keys: "F1", desc: "Bu yardım panelini göster" },
                { keys: "F2", desc: "API belgelerini aç" },
                { keys: "Tab", desc: "4 boşluk ekle (girinti)" },
                { keys: "Esc", desc: "Aktif paneli kapat" }
            ],
            
            features: [
                {
                    title: "🎯 Otomatik Tamamlama",
                    desc: "Yazarken API önerileriyle akıllı kod tamamlama. Manuel olarak tetiklemek için Ctrl+Space'e basın."
                },
                {
                    title: "📝 Kod Parçacıkları",
                    desc: "Yaygın görevler için önceden yazılmış kod örnekleri. Ctrl+Shift+P veya Parçacıklar düğmesi ile erişin."
                },
                {
                    title: "📚 API Belgeleri",
                    desc: "Tüm nesneler, yöntemler ve özellikler için aranabilir belgelerle eksiksiz Premiere Pro ExtendScript API referansı."
                },
                {
                    title: "💾 Kaydet ve Yükle",
                    desc: "Kodunuzu yerel olarak kaydedin ve daha sonra geri yükleyin. Kod oturumlar arasında otomatik olarak kalır."
                },
                {
                    title: "🔍 Konsol Arama",
                    desc: "Belirli sonuçları hızlıca bulmak için konsol çıktısını filtreleyin."
                },
                {
                    title: "🎨 Kod Biçimlendirme",
                    desc: "Kodunuzu uygun girintiyle otomatik olarak biçimlendirin."
                },
                {
                    title: "⚡ Gerçek Zamanlı Çalıştırma",
                    desc: "Kodu doğrudan Premiere Pro'da çalıştırın ve sonuçları anında görün."
                }
            ],
            
            examples: [
                {
                    title: "Proje Bilgilerini Al",
                    code: `// Mevcut proje detaylarını al
$.writeln("Proje: " + app.project.name);
$.writeln("Yol: " + app.project.path);
$.writeln("Sekanslar: " + app.project.sequences.numSequences);`
                },
                {
                    title: "Sekans İşaretlerini Listele",
                    code: `// Aktif sekanstaki tüm işaretleri al
var markers = app.project.activeSequence.markers;
var marker = markers.getFirstMarker();
while (marker) {
    $.writeln(marker.name + " " + marker.start.seconds + "s'de");
    marker = markers.getNextMarker(marker);
}`
                },
                {
                    title: "Sekansı Dışa Aktar",
                    code: `// Aktif sekansı dışa aktar
var seq = app.project.activeSequence;
seq.exportAsMediaDirect(
    "C:/Output/export.mp4",
    "C:/Presets/H264.epr",
    0  // 0=tamamı, 1=giriş-çıkış, 2=çalışma alanı
);`
                }
            ],
            
            tips: [
                "Konsola metin çıktısı almak için $.writeln() kullanın",
                "'app' üzerinden ana uygulama nesnesine erişin",
                "Çoğu işlem inceleyebileceğiniz değerler döndürür",
                "Mevcut yöntemler için API Dokümanlarını (F2) kontrol edin",
                "Kod parçacıkları yaygın görevler için çalışan örnekler içerir",
                "Kodunuz oturumlar arasında otomatik olarak kaydedilir",
                "Hata işleme için try-catch blokları kullanın"
            ],
            
            links: {
                officialDocs: "Resmi Premiere Pro Betik Belgeleri",
                openLink: "Tarayıcıda açmak için tıklayın"
            }
        }
    },
    
    ja: {
        name: "日本語",
        flag: "🇯🇵",
        help: {
            title: "Premiere Pro コンソールヘルプ",
            welcome: "Premiere Pro コンソールへようこそ！",
            description: "Adobe Premiere Pro ワークフローを自動化するための強力な ExtendScript コンソール。",
            
            sections: {
                gettingStarted: "はじめに",
                shortcuts: "キーボードショートカット",
                features: "機能",
                codeExamples: "コード例",
                tips: "ヒントとコツ",
                resources: "リソース"
            },
            
            gettingStarted: {
                intro: "Premiere Pro コンソールを使用すると、Premiere Pro 内で直接 ExtendScript コードを実行できます。",
                steps: [
                    "エディターに ExtendScript コードを入力",
                    "Ctrl+Enter（または実行ボタン）を押して実行",
                    "下のコンソール出力で結果を表示",
                    "提案を得るために自動補完（Ctrl+Space）を使用",
                    "参照用に API ドキュメント（F2）を参照"
                ]
            },
            
            shortcuts: [
                { keys: "Ctrl + Enter", desc: "コードを実行" },
                { keys: "Ctrl + Space", desc: "自動補完をトリガー" },
                { keys: "Ctrl + Shift + P", desc: "コードスニペットを開く" },
                { keys: "Ctrl + S", desc: "コードをローカルに保存" },
                { keys: "Ctrl + O", desc: "保存したコードを読み込む" },
                { keys: "F1", desc: "このヘルプパネルを表示" },
                { keys: "F2", desc: "API ドキュメントを開く" },
                { keys: "Tab", desc: "4つのスペースを挿入（インデント）" },
                { keys: "Esc", desc: "アクティブなパネルを閉じる" }
            ],
            
            features: [
                {
                    title: "🎯 自動補完",
                    desc: "入力中に API 提案を含むスマートなコード補完。手動でトリガーするには Ctrl+Space を押します。"
                },
                {
                    title: "📝 コードスニペット",
                    desc: "一般的なタスク用の事前作成されたコード例。Ctrl+Shift+P またはスニペットボタンでアクセス。"
                },
                {
                    title: "📚 API ドキュメント",
                    desc: "すべてのオブジェクト、メソッド、プロパティの検索可能なドキュメントを含む完全な Premiere Pro ExtendScript API リファレンス。"
                },
                {
                    title: "💾 保存と読み込み",
                    desc: "コードをローカルに保存し、後で復元します。コードはセッション間で自動的に保持されます。"
                },
                {
                    title: "🔍 コンソール検索",
                    desc: "コンソール出力をフィルタリングして、特定の結果をすばやく見つけます。"
                },
                {
                    title: "🎨 コード整形",
                    desc: "適切なインデントでコードを自動的に整形します。"
                },
                {
                    title: "⚡ リアルタイム実行",
                    desc: "Premiere Pro で直接コードを実行し、すぐに結果を確認します。"
                }
            ],
            
            examples: [
                {
                    title: "プロジェクト情報を取得",
                    code: `// 現在のプロジェクトの詳細を取得
$.writeln("プロジェクト: " + app.project.name);
$.writeln("パス: " + app.project.path);
$.writeln("シーケンス: " + app.project.sequences.numSequences);`
                },
                {
                    title: "シーケンスマーカーをリスト",
                    code: `// アクティブシーケンスのすべてのマーカーを取得
var markers = app.project.activeSequence.markers;
var marker = markers.getFirstMarker();
while (marker) {
    $.writeln(marker.name + " " + marker.start.seconds + "秒");
    marker = markers.getNextMarker(marker);
}`
                },
                {
                    title: "シーケンスをエクスポート",
                    code: `// アクティブシーケンスをエクスポート
var seq = app.project.activeSequence;
seq.exportAsMediaDirect(
    "C:/Output/export.mp4",
    "C:/Presets/H264.epr",
    0  // 0=全体, 1=イン-アウト, 2=ワークエリア
);`
                }
            ],
            
            tips: [
                "コンソールにテキストを出力するには $.writeln() を使用",
                "'app' を介してメインアプリケーションオブジェクトにアクセス",
                "ほとんどの操作は検査できる値を返します",
                "利用可能なメソッドについては API ドキュメント（F2）を確認",
                "コードスニペットには一般的なタスクの実用例が含まれています",
                "コードはセッション間で自動的に保存されます",
                "エラー処理には try-catch ブロックを使用"
            ],
            
            links: {
                officialDocs: "Premiere Pro 公式スクリプトドキュメント",
                openLink: "ブラウザで開くにはクリック"
            }
        }
    },
    
    ko: {
        name: "한국어",
        flag: "🇰🇷",
        help: {
            title: "Premiere Pro 콘솔 도움말",
            welcome: "Premiere Pro 콘솔에 오신 것을 환영합니다!",
            description: "Adobe Premiere Pro 워크플로우를 자동화하기 위한 강력한 ExtendScript 콘솔입니다.",
            
            sections: {
                gettingStarted: "시작하기",
                shortcuts: "키보드 단축키",
                features: "기능",
                codeExamples: "코드 예제",
                tips: "팁 및 요령",
                resources: "리소스"
            },
            
            gettingStarted: {
                intro: "Premiere Pro 콘솔을 사용하면 Premiere Pro 내에서 직접 ExtendScript 코드를 실행할 수 있습니다.",
                steps: [
                    "편집기에 ExtendScript 코드 입력",
                    "실행하려면 Ctrl+Enter를 누르거나 실행 버튼 클릭",
                    "아래 콘솔 출력에서 결과 확인",
                    "제안을 위해 자동 완성(Ctrl+Space) 사용",
                    "참조용 API 문서(F2) 탐색"
                ]
            },
            
            shortcuts: [
                { keys: "Ctrl + Enter", desc: "코드 실행" },
                { keys: "Ctrl + Space", desc: "자동 완성 트리거" },
                { keys: "Ctrl + Shift + P", desc: "코드 스니펫 열기" },
                { keys: "Ctrl + S", desc: "로컬에 코드 저장" },
                { keys: "Ctrl + O", desc: "저장된 코드 불러오기" },
                { keys: "F1", desc: "이 도움말 패널 표시" },
                { keys: "F2", desc: "API 문서 열기" },
                { keys: "Tab", desc: "4개의 공백 삽입(들여쓰기)" },
                { keys: "Esc", desc: "활성 패널 닫기" }
            ],
            
            features: [
                {
                    title: "🎯 자동 완성",
                    desc: "입력하는 동안 API 제안과 함께 스마트 코드 완성. 수동으로 트리거하려면 Ctrl+Space를 누르세요."
                },
                {
                    title: "📝 코드 스니펫",
                    desc: "일반적인 작업을 위한 미리 작성된 코드 예제. Ctrl+Shift+P 또는 스니펫 버튼으로 액세스."
                },
                {
                    title: "📚 API 문서",
                    desc: "모든 객체, 메서드 및 속성에 대한 검색 가능한 문서가 포함된 완전한 Premiere Pro ExtendScript API 참조."
                },
                {
                    title: "💾 저장 및 불러오기",
                    desc: "코드를 로컬에 저장하고 나중에 복원하세요. 코드는 세션 간에 자동으로 유지됩니다."
                },
                {
                    title: "🔍 콘솔 검색",
                    desc: "콘솔 출력을 필터링하여 특정 결과를 빠르게 찾습니다."
                },
                {
                    title: "🎨 코드 서식",
                    desc: "적절한 들여쓰기로 코드를 자동으로 서식 지정합니다."
                },
                {
                    title: "⚡ 실시간 실행",
                    desc: "Premiere Pro에서 직접 코드를 실행하고 즉시 결과를 확인하세요."
                }
            ],
            
            examples: [
                {
                    title: "프로젝트 정보 가져오기",
                    code: `// 현재 프로젝트 세부 정보 가져오기
$.writeln("프로젝트: " + app.project.name);
$.writeln("경로: " + app.project.path);
$.writeln("시퀀스: " + app.project.sequences.numSequences);`
                },
                {
                    title: "시퀀스 마커 나열",
                    code: `// 활성 시퀀스의 모든 마커 가져오기
var markers = app.project.activeSequence.markers;
var marker = markers.getFirstMarker();
while (marker) {
    $.writeln(marker.name + " " + marker.start.seconds + "초");
    marker = markers.getNextMarker(marker);
}`
                },
                {
                    title: "시퀀스 내보내기",
                    code: `// 활성 시퀀스 내보내기
var seq = app.project.activeSequence;
seq.exportAsMediaDirect(
    "C:/Output/export.mp4",
    "C:/Presets/H264.epr",
    0  // 0=전체, 1=인-아웃, 2=작업 영역
);`
                }
            ],
            
            tips: [
                "콘솔에 텍스트를 출력하려면 $.writeln() 사용",
                "'app'을 통해 메인 애플리케이션 객체에 액세스",
                "대부분의 작업은 검사할 수 있는 값을 반환합니다",
                "사용 가능한 메서드는 API 문서(F2) 확인",
                "코드 스니펫에는 일반적인 작업에 대한 실용 예제가 포함되어 있습니다",
                "코드는 세션 간에 자동으로 저장됩니다",
                "오류 처리를 위해 try-catch 블록 사용"
            ],
            
            links: {
                officialDocs: "Premiere Pro 공식 스크립팅 문서",
                openLink: "브라우저에서 열려면 클릭"
            }
        }
    },
    
    ru: {
        name: "Русский",
        flag: "🇷🇺",
        help: {
            title: "Справка по консоли Premiere Pro",
            welcome: "Добро пожаловать в консоль Premiere Pro!",
            description: "Мощная консоль ExtendScript для автоматизации рабочих процессов Adobe Premiere Pro.",
            
            sections: {
                gettingStarted: "Начало работы",
                shortcuts: "Горячие клавиши",
                features: "Функции",
                codeExamples: "Примеры кода",
                tips: "Советы и хитрости",
                resources: "Ресурсы"
            },
            
            gettingStarted: {
                intro: "Консоль Premiere Pro позволяет выполнять код ExtendScript непосредственно в Premiere Pro.",
                steps: [
                    "Введите код ExtendScript в редактор",
                    "Нажмите Ctrl+Enter (или кнопку Выполнить) для выполнения",
                    "Просмотрите результаты в консоли ниже",
                    "Используйте автозаполнение (Ctrl+Space) для подсказок",
                    "Просмотрите документацию API (F2) для справки"
                ]
            },
            
            shortcuts: [
                { keys: "Ctrl + Enter", desc: "Выполнить код" },
                { keys: "Ctrl + Space", desc: "Вызвать автозаполнение" },
                { keys: "Ctrl + Shift + P", desc: "Открыть фрагменты кода" },
                { keys: "Ctrl + S", desc: "Сохранить код локально" },
                { keys: "Ctrl + O", desc: "Загрузить сохраненный код" },
                { keys: "F1", desc: "Показать эту панель справки" },
                { keys: "F2", desc: "Открыть документацию API" },
                { keys: "Tab", desc: "Вставить 4 пробела (отступ)" },
                { keys: "Esc", desc: "Закрыть активную панель" }
            ],
            
            features: [
                {
                    title: "🎯 Автозаполнение",
                    desc: "Умное завершение кода с подсказками API во время набора. Нажмите Ctrl+Space для ручного вызова."
                },
                {
                    title: "📝 Фрагменты кода",
                    desc: "Готовые примеры кода для общих задач. Доступ через Ctrl+Shift+P или кнопку Snippets."
                },
                {
                    title: "📚 Документация API",
                    desc: "Полный справочник Premiere Pro ExtendScript API с поисковой документацией для всех объектов, методов и свойств."
                },
                {
                    title: "💾 Сохранение и загрузка",
                    desc: "Сохраняйте код локально и восстанавливайте позже. Код сохраняется между сеансами автоматически."
                },
                {
                    title: "🔍 Поиск в консоли",
                    desc: "Фильтруйте вывод консоли для быстрого поиска конкретных результатов."
                },
                {
                    title: "🎨 Форматирование кода",
                    desc: "Автоматическое форматирование кода с правильными отступами."
                },
                {
                    title: "⚡ Выполнение в реальном времени",
                    desc: "Выполняйте код прямо в Premiere Pro и сразу видите результаты."
                }
            ],
            
            examples: [
                {
                    title: "Получить информацию о проекте",
                    code: `// Получить информацию о текущем проекте
$.writeln("Проект: " + app.project.name);
$.writeln("Путь: " + app.project.path);
$.writeln("Последовательности: " + app.project.sequences.numSequences);`
                },
                {
                    title: "Список маркеров последовательности",
                    code: `// Получить все маркеры в активной последовательности
var markers = app.project.activeSequence.markers;
var marker = markers.getFirstMarker();
while (marker) {
    $.writeln(marker.name + " на " + marker.start.seconds + "с");
    marker = markers.getNextMarker(marker);
}`
                },
                {
                    title: "Экспорт последовательности",
                    code: `// Экспортировать активную последовательность
var seq = app.project.activeSequence;
seq.exportAsMediaDirect(
    "C:/Output/export.mp4",
    "C:/Presets/H264.epr",
    0  // 0=полностью, 1=вход-выход, 2=рабочая область
);`
                }
            ],
            
            tips: [
                "Используйте $.writeln() для вывода текста в консоль",
                "Доступ к основному объекту приложения через 'app'",
                "Большинство операций возвращают значения, которые можно проверить",
                "Проверьте документацию API (F2) для доступных методов",
                "Фрагменты кода включают рабочие примеры для общих задач",
                "Ваш код автоматически сохраняется между сеансами",
                "Используйте блоки try-catch для обработки ошибок"
            ],
            
            links: {
                officialDocs: "Официальная документация по скриптингу Premiere Pro",
                openLink: "Нажмите, чтобы открыть в браузере"
            }
        }
    },
    
    uk: {
        name: "Українська",
        flag: "🇺🇦",
        help: {
            title: "Довідка консолі Premiere Pro",
            welcome: "Ласкаво просимо до консолі Premiere Pro!",
            description: "Потужна консоль ExtendScript для автоматизації робочих процесів Adobe Premiere Pro.",
            
            sections: {
                gettingStarted: "Початок роботи",
                shortcuts: "Гарячі клавіші",
                features: "Функції",
                codeExamples: "Приклади коду",
                tips: "Поради та хитрощі",
                resources: "Ресурси"
            },
            
            gettingStarted: {
                intro: "Консоль Premiere Pro дозволяє виконувати код ExtendScript безпосередньо в Premiere Pro.",
                steps: [
                    "Введіть код ExtendScript в редактор",
                    "Натисніть Ctrl+Enter (або кнопку Виконати) для виконання",
                    "Перегляньте результати в консолі нижче",
                    "Використовуйте автозаповнення (Ctrl+Space) для підказок",
                    "Перегляньте документацію API (F2) для довідки"
                ]
            },
            
            shortcuts: [
                { keys: "Ctrl + Enter", desc: "Виконати код" },
                { keys: "Ctrl + Space", desc: "Викликати автозаповнення" },
                { keys: "Ctrl + Shift + P", desc: "Відкрити фрагменти коду" },
                { keys: "Ctrl + S", desc: "Зберегти код локально" },
                { keys: "Ctrl + O", desc: "Завантажити збережений код" },
                { keys: "F1", desc: "Показати цю панель довідки" },
                { keys: "F2", desc: "Відкрити документацію API" },
                { keys: "Tab", desc: "Вставити 4 пробіли (відступ)" },
                { keys: "Esc", desc: "Закрити активну панель" }
            ],
            
            features: [
                {
                    title: "🎯 Автозаповнення",
                    desc: "Розумне завершення коду з підказками API під час набору. Натисніть Ctrl+Space для ручного виклику."
                },
                {
                    title: "📝 Фрагменти коду",
                    desc: "Готові приклади коду для загальних завдань. Доступ через Ctrl+Shift+P або кнопку Snippets."
                },
                {
                    title: "📚 Документація API",
                    desc: "Повний довідник Premiere Pro ExtendScript API з пошуковою документацією для всіх об'єктів, методів та властивостей."
                },
                {
                    title: "💾 Збереження та завантаження",
                    desc: "Зберігайте код локально і відновлюйте пізніше. Код зберігається між сеансами автоматично."
                },
                {
                    title: "🔍 Пошук у консолі",
                    desc: "Фільтруйте вивід консолі для швидкого пошуку конкретних результатів."
                },
                {
                    title: "🎨 Форматування коду",
                    desc: "Автоматичне форматування коду з правильними відступами."
                },
                {
                    title: "⚡ Виконання в реальному часі",
                    desc: "Виконуйте код прямо в Premiere Pro і одразу бачте результати."
                }
            ],
            
            examples: [
                {
                    title: "Отримати інформацію про проект",
                    code: `// Отримати інформацію про поточний проект
$.writeln("Проект: " + app.project.name);
$.writeln("Шлях: " + app.project.path);
$.writeln("Послідовності: " + app.project.sequences.numSequences);`
                },
                {
                    title: "Список маркерів послідовності",
                    code: `// Отримати всі маркери в активній послідовності
var markers = app.project.activeSequence.markers;
var marker = markers.getFirstMarker();
while (marker) {
    $.writeln(marker.name + " на " + marker.start.seconds + "с");
    marker = markers.getNextMarker(marker);
}`
                },
                {
                    title: "Експорт послідовності",
                    code: `// Експортувати активну послідовність
var seq = app.project.activeSequence;
seq.exportAsMediaDirect(
    "C:/Output/export.mp4",
    "C:/Presets/H264.epr",
    0  // 0=повністю, 1=вхід-вихід, 2=робоча область
);`
                }
            ],
            
            tips: [
                "Використовуйте $.writeln() для виведення тексту в консоль",
                "Доступ до основного об'єкта додатка через 'app'",
                "Більшість операцій повертають значення, які можна перевірити",
                "Перевірте документацію API (F2) для доступних методів",
                "Фрагменти коду включають робочі приклади для загальних завдань",
                "Ваш код автоматично зберігається між сеансами",
                "Використовуйте блоки try-catch для обробки помилок"
            ],
            
            links: {
                officialDocs: "Офіційна документація зі скриптингу Premiere Pro",
                openLink: "Натисніть, щоб відкрити в браузері"
            }
        }
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TRANSLATIONS;
} else {
    window.TRANSLATIONS = TRANSLATIONS;
}
