<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Understanding srcset & Dark Mode Images</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            color: #333;
            min-height: 100vh;
            padding: 20px;
            transition: background 0.5s ease;
        }
        
        body.dark-mode {
            background: linear-gradient(135deg, #232526 0%, #414345 100%);
            color: #f0f0f0;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            margin-bottom: 40px;
            border-bottom: 1px solid #ddd;
        }
        
        body.dark-mode header {
            border-bottom: 1px solid #444;
        }
        
        h1 {
            font-size: 2.5rem;
            background: linear-gradient(90deg, #ff7e5f, #feb47b);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        
        body.dark-mode h1 {
            background: linear-gradient(90deg, #ff7e5f, #feb47b);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        
        .theme-switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
        }
        
        .theme-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 34px;
        }
        
        .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        
        input:checked + .slider {
            background-color: #2196F3;
        }
        
        input:checked + .slider:before {
            transform: translateX(26px);
        }
        
        .content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 40px;
        }
        
        @media (max-width: 768px) {
            .content {
                grid-template-columns: 1fr;
            }
        }
        
        .card {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        body.dark-mode .card {
            background: #2c2c2c;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
        
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }
        
        body.dark-mode .card:hover {
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
        }
        
        .card-header {
            padding: 20px;
            background: linear-gradient(90deg, #4b6cb7, #182848);
            color: white;
        }
        
        body.dark-mode .card-header {
            background: linear-gradient(90deg, #ff7e5f, #feb47b);
        }
        
        .card-body {
            padding: 20px;
        }
        
        .card-body h3 {
            margin-bottom: 15px;
            color: #333;
        }
        
        body.dark-mode .card-body h3 {
            color: #f0f0f0;
        }
        
        .card-body p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 15px;
        }
        
        body.dark-mode .card-body p {
            color: #ccc;
        }
        
        .image-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            margin: 30px 0;
        }
        
        img {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 10px;
        }
        
        .code-example {
            background: #f5f5f5;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            overflow-x: auto;
        }
        
        body.dark-mode .code-example {
            background: #3a3a3a;
        }
        
        pre {
            white-space: pre-wrap;
            color: #333;
        }
        
        body.dark-mode pre {
            color: #f0f0f0;
        }
        
        code {
            font-family: monospace;
        }
        
        .keyword {
            color: #0077aa;
        }
        
        body.dark-mode .keyword {
            color: #4fb4d7;
        }
        
        .attribute {
            color: #dd4a68;
        }
        
        body.dark-mode .attribute {
            color: #ff7e8b;
        }
        
        .value {
            color: #208e2e;
        }
        
        body.dark-mode .value {
            color: #7eca9c;
        }
        
        .comment {
            color: #999;
        }
        
        .instructions {
            background: white;
            border-radius: 15px;
            padding: 25px;
            margin-top: 40px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        body.dark-mode .instructions {
            background: #2c2c2c;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
        
        .instructions h2 {
            margin-bottom: 15px;
            color: #333;
        }
        
        body.dark-mode .instructions h2 {
            color: #f0f0f0;
        }
        
        .instructions p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 15px;
        }
        
        body.dark-mode .instructions p {
            color: #ccc;
        }
        
        footer {
            text-align: center;
            margin-top: 50px;
            padding: 20px;
            color: #666;
            border-top: 1px solid #ddd;
        }
        
        body.dark-mode footer {
            color: #ccc;
            border-top: 1px solid #444;
        }
        
        .tag {
            display: inline-block;
            background: #e7f4ff;
            color: #0077aa;
            padding: 2px 8px;
            border-radius: 4px;
            font-family: monospace;
            margin: 5px 0;
        }
        
        body.dark-mode .tag {
            background: #2c4762;
            color: #4fb4d7;
        }
        
        .demo-image {
            width: 100%;
            max-width: 500px;
            margin: 20px auto;
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Understanding srcset & Dark Mode Images</h1>
            <label class="theme-switch">
                <input type="checkbox" id="theme-toggle">
                <span class="slider"></span>
            </label>
        </header>
        
        <div class="content">
            <div class="card">
                <div class="card-header">
                    <h2><i class="fas fa-image"></i> What is srcset?</h2>
                </div>
                <div class="card-body">
                    <h3>Responsive Images with srcset</h3>
                    <p>The <span class="tag">srcset</span> attribute allows you to specify multiple image sources for different screen sizes and resolutions.</p>
                    
                    <div class="code-example">
                        <pre><code>&lt;img <span class="keyword">src</span>=<span class="value">"small.jpg"</span>
     <span class="keyword">srcset</span>=<span class="value">"small.jpg 300w,
             medium.jpg 600w,
             large.jpg 900w"</span>
     <span class="keyword">sizes</span>=<span class="value">"(max-width: 600px) 300px,
            (max-width: 900px) 600px,
            900px"</span>
     <span class="keyword">alt</span>=<span class="value">"Responsive image"</span>&gt;</code></pre>
                    </div>
                    
                    <p>The browser will automatically choose the most appropriate image based on the device's screen size and resolution.</p>
                    
                    <h3>How srcset Works</h3>
                    <p>1. <strong>Width descriptors (300w)</strong>: Specify the intrinsic width of each image</p>
                    <p>2. <strong>Sizes attribute</strong>: Defines the display size of the image under different conditions</p>
                    <p>3. <strong>Browser selection</strong>: The browser picks the best image based on device capabilities</p>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h2><i class="fas fa-moon"></i> Dark Mode Images</h2>
                </div>
                <div class="card-body">
                    <h3>Adapting Images for Dark Mode</h3>
                    <p>Using the <span class="tag">picture</span> element with media queries, you can serve different images for light and dark modes.</p>
                    
                    <div class="code-example">
                        <pre><code>&lt;picture&gt;
  <span class="comment">&lt;!-- Light mode image --&gt;</span>
  &lt;source <span class="keyword">srcset</span>=<span class="value">"light-mode.jpg"</span> <span class="keyword">media</span>=<span class="value">"(prefers-color-scheme: light)"</span>&gt;
  
  <span class="comment">&lt;!-- Dark mode image --&gt;</span>
  &lt;source <span class="keyword">srcset</span>=<span class="value">"dark-mode.jpg"</span> <span class="keyword">media</span>=<span class="value">"(prefers-color-scheme: dark)"</span>&gt;
  
  <span class="comment">&lt;!-- Fallback image --&gt;</span>
  &lt;img <span class="keyword">src</span>=<span class="value">"light-mode.jpg"</span> <span class="keyword">alt</span>=<span class="value">"Example image"</span>&gt;
&lt;/picture&gt;</code></pre>
                    </div>
                    
                    <div class="image-container">
                        <picture>
                            <!-- Light mode image -->
                            <source srcset="https://images.unsplash.com/photo-1500470354667-22b6b4e8bc59?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" media="(prefers-color-scheme: light)">
                            <!-- Dark mode image (fox) -->
                            <source srcset="https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" media="(prefers-color-scheme: dark)">
                            <!-- Fallback image -->
                            <img src="https://images.unsplash.com/photo-1500470354667-22b6b4e8bc59?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Example image changing with color scheme">
                        </picture>
                        <p>This image changes based on your color scheme preference</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="instructions">
            <h2>Implementing Dark Mode Images</h2>
            <p>To implement dark mode images on your website:</p>
            <p>1. Create two versions of your image - one optimized for light mode and one for dark mode</p>
            <p>2. Use the <span class="tag">picture</span> element with <span class="tag">source</span> tags pointing to each image</p>
            <p>3. Use the <span class="tag">media</span> attribute with <span class="value">"(prefers-color-scheme: light)"</span> and <span class="value">"(prefers-color-scheme: dark)"</span> to target each mode</p>
            <p>4. Provide a fallback <span class="tag">img</span> tag for browsers that don't support the picture element</p>
            
            <div class="code-example">
                <pre><code><span class="comment">&lt;!-- Replace YOUR-DARKMODE-IMAGE with the URL of your dark mode image --&gt;</span>
&lt;picture&gt;
  &lt;source srcset=<span class="value">"YOUR-LIGHTMODE-IMAGE"</span> media=<span class="value">"(prefers-color-scheme: light)"</span>&gt;
  &lt;source srcset=<span class="value">"YOUR-DARKMODE-IMAGE"</span> media=<span class="value">"(prefers-color-scheme: dark)"</span>&gt;
  &lt;img src=<span class="value">"YOUR-LIGHTMODE-IMAGE"</span> alt=<span class="value">"Description"</span>&gt;
&lt;/picture&gt;</code></pre>
            </div>
        </div>
        
        <footer>
            <p>Created with HTML, CSS, and JavaScript | Understanding srcset and Dark Mode Images</p>
        </footer>
    </div>

    <script>
        // Get the theme toggle checkbox
        const themeToggle = document.getElementById('theme-toggle');
        
        // Check for saved theme preference or use system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        }
        
        // Listen for toggle changes
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            const newColorScheme = event.matches ? "dark" : "light";
            if (!localStorage.getItem('theme')) {
                if (newColorScheme === 'dark') {
                    document.body.classList.add('dark-mode');
                    themeToggle.checked = true;
                } else {
                    document.body.classList.remove('dark-mode');
                    themeToggle.checked = false;
                }
            }
        });
    </script>
</body>
</html>



## Hi there 👋

<picture>
 <source media="(prefers-color-scheme: dark)" srcset="YOUR-DARKMODE-IMAGE">
 <source media="(prefers-color-scheme: light)" srcset="YOUR-LIGHTMODE-IMAGE">
 <img alt="YOUR-ALT-TEXT" src="YOUR-DEFAULT-IMAGE">
</picture>

<!--
**Prosper-P-Bowman/Prosper-P-Bowman** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
