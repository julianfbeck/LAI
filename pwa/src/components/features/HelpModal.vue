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
            <div class="text-center">
                <h1>Usage instructions</h1>
                <p>The following steps explain the usage of the LAI portal.</p>
            </div>
            <hr>
            <h2>Step 1: Open your online test</h2>
            <p>
                Login to your ILIAS instance and navigate to your online test. Open the test.
            </p>
            <img src="/img/help/open-test-a.png" class="lai-shrink-image" alt="">

            <h2>Step 2: Select tab "Export"</h2>
            <p>
                Inside your online test, open the tab called <i>"Export"</i>.
            </p>
            <img src="/img/help/select-export-tab-a.png" class="lai-shrink-image" alt="">

            <h2>Step 3: Create export file</h2>
            <p>
                Open the dropdown next to Typ and select <i>"Erstelle Exportdatei (inkl. Teilnehmerergebnisse)"</i>.
            </p>
            <img src="/img/help/create-export-file.png" class="lai-shrink-image" alt="">

            <h2>Step 4: Download export file(s)</h2>
            <p>
                Download your generated export files via the <i>"Herunterladen"</i> button.
            </p>
            <img src="/img/help/download-export-file-a.png" class="lai-shrink-image" alt="">

            <h2>Step 5: Upload your exported zip file(s)</h2>
            <p>
                Your generated zip files must have a file structure like this:
            </p>
            <code style="padding: 10px">
                <i>zip-file-structure:</i><br>
                [contains a folder with these files:]<br>
                --- *_qti_[number].xml<br>
                --- *_results_[number].xml<br>
                --- *_tst_[number].xml
            </code>

        </div>
    </modal>
</template>

<style lang="scss">
    .modal-content {
        padding: 20px;

        h2 {
            margin-top: 10px;
        }
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