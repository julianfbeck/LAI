<template>
    <modal name="helpModal"
           transition="nice-modal-fade"
           classes="modal-class"
           :min-width="200"
           :min-height="200"
           :pivot-y="0.5"
           :adaptive="true"
           :scrollable="true"
           :reset="true"
           width="60%"
           height="auto">

        <div class="modal-content">
            <div style="text-align: center">
                <h1>Usage instructions</h1>
                <p>The following steps explain the usage of the LAI portal.</p>
            </div>
            <hr>
            <br>
            <h2>Section 1: Step name</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dictum purus egestas libero ornare venenatis.
                Maecenas pharetra tortor eu tortor imperdiet, a faucibus quam finibus. Nulla id lacinia quam.
                Praesent imperdiet sed magna non finibus. Aenean blandit, mauris vitae lacinia rutrum,
                nunc mi scelerisque sem, in laoreet sem lectus ut orci. Ut egestas nulla in vehicula feugiat.
                Vivamus tincidunt nisi vel risus dictum suscipit. Nulla id blandit mi, vulputate aliquam enim.
            </p>
            <h2>Section 2: Step name</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dictum purus egestas libero ornare venenatis.
                Maecenas pharetra tortor eu tortor imperdiet, a faucibus quam finibus. Nulla id lacinia quam.
                Praesent imperdiet sed magna non finibus. Aenean blandit, mauris vitae lacinia rutrum,
                nunc mi scelerisque sem, in laoreet sem lectus ut orci. Ut egestas nulla in vehicula feugiat.
                Vivamus tincidunt nisi vel risus dictum suscipit. Nulla id blandit mi, vulputate aliquam enim.
            </p>
            <h2>Section 3: Step name</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dictum purus egestas libero ornare venenatis.
                Maecenas pharetra tortor eu tortor imperdiet, a faucibus quam finibus. Nulla id lacinia quam.
                Praesent imperdiet sed magna non finibus. Aenean blandit, mauris vitae lacinia rutrum,
                nunc mi scelerisque sem, in laoreet sem lectus ut orci. Ut egestas nulla in vehicula feugiat.
                Vivamus tincidunt nisi vel risus dictum suscipit. Nulla id blandit mi, vulputate aliquam enim.
            </p>
        </div>
    </modal>
</template>

<style>
    .modal-content {
        padding: 20px;
        font-style: 13px;
    }
    .v--modal-overlay[data-modal="helpModal"] {
        background: rgba(0, 0, 0, 0.5);
    }

    .modal-class {
        border-radius: 5px;
        background: #F7F7F7;
        box-shadow: 5px 5px 30px 0 rgba(46,61,73, 0.6);
    }
</style>